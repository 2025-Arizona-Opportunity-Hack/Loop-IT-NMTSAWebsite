/**
 * Chatbot Connection Diagnostic Script
 * Tests AWS Bedrock connection and identifies issues
 */

const { BedrockRuntimeClient, ConverseCommand } = require('@aws-sdk/client-bedrock-runtime');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testChatbotConnection() {
  log('\n🔍 NMTSA Chatbot Connection Diagnostics\n', 'blue');
  log('━'.repeat(50), 'blue');

  // Step 1: Check Environment Variables
  log('\n1️⃣  Checking Environment Variables...', 'magenta');
  
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region) {
    log('   ❌ AWS_REGION is not set', 'red');
    log('   💡 Add AWS_REGION=us-east-1 to your .env.local file', 'yellow');
    return;
  } else {
    log(`   ✅ AWS_REGION: ${region}`, 'green');
  }

  if (!accessKeyId || accessKeyId.includes('your_aws') || accessKeyId.length < 10) {
    log('   ❌ AWS_ACCESS_KEY_ID is missing or invalid', 'red');
    log('   💡 Set a valid AWS Access Key ID in .env.local', 'yellow');
    log('   📖 See CHATBOT_SETUP.md for instructions', 'yellow');
    return;
  } else {
    log(`   ✅ AWS_ACCESS_KEY_ID: ${accessKeyId.substring(0, 8)}...`, 'green');
  }

  if (!secretAccessKey || secretAccessKey.includes('your_aws') || secretAccessKey.length < 10) {
    log('   ❌ AWS_SECRET_ACCESS_KEY is missing or invalid', 'red');
    log('   💡 Set a valid AWS Secret Access Key in .env.local', 'yellow');
    log('   📖 See CHATBOT_SETUP.md for instructions', 'yellow');
    return;
  } else {
    log(`   ✅ AWS_SECRET_ACCESS_KEY: ${secretAccessKey.substring(0, 8)}...`, 'green');
  }

  // Step 2: Test AWS Bedrock Connection
  log('\n2️⃣  Testing AWS Bedrock Connection...', 'magenta');
  
  const client = new BedrockRuntimeClient({
    region: region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  const modelId = 'amazon.nova-pro-v1:0';
  log(`   🤖 Model: ${modelId}`, 'blue');

  try {
    log('   📡 Sending test request to Bedrock...', 'yellow');
    
    const command = new ConverseCommand({
      modelId: modelId,
      messages: [
        {
          role: 'user',
          content: [{ text: 'Hello, this is a test. Please respond with "Test successful".' }],
        },
      ],
      inferenceConfig: {
        maxTokens: 100,
        temperature: 0.3,
      },
    });

    const response = await client.send(command);
    const responseText = response.output?.message?.content?.[0]?.text;

    if (responseText) {
      log('   ✅ Connection successful!', 'green');
      log(`   💬 Response: "${responseText.substring(0, 100)}..."`, 'green');
      log('\n✨ Your chatbot should work now!', 'green');
      log('💡 If the web chatbot still fails, try restarting your dev server:', 'yellow');
      log('   npm run dev', 'yellow');
    } else {
      log('   ⚠️  Connected but no response received', 'yellow');
      log('   Response structure:', 'yellow');
      console.log(response);
    }

  } catch (error) {
    log('   ❌ Connection failed!', 'red');
    log(`   Error: ${error.name}`, 'red');
    log(`   Message: ${error.message}`, 'red');
    
    // Provide specific guidance based on error type
    if (error.name === 'ValidationException') {
      log('\n🔍 Diagnosis: Validation Error', 'yellow');
      log('   This usually means:', 'yellow');
      log('   1. The Nova Pro model is not enabled in your AWS account', 'yellow');
      log('   2. The model ID is incorrect', 'yellow');
      log('   3. The request format is not supported', 'yellow');
      log('\n💡 Solution:', 'yellow');
      log('   1. Log into AWS Console → Amazon Bedrock', 'yellow');
      log('   2. Go to "Model access" in the left sidebar', 'yellow');
      log(`   3. Find "Nova Pro" and click "Request model access"`, 'yellow');
      log('   4. Wait for approval (usually instant)', 'yellow');
      log('   5. Make sure you are using the same region:', region, 'yellow');
    } else if (error.name === 'AccessDeniedException') {
      log('\n🔍 Diagnosis: Access Denied', 'yellow');
      log('   This usually means:', 'yellow');
      log('   1. Your AWS credentials are invalid', 'yellow');
      log('   2. The IAM user lacks Bedrock permissions', 'yellow');
      log('\n💡 Solution:', 'yellow');
      log('   1. Verify your AWS credentials are correct', 'yellow');
      log('   2. Ensure the IAM user has AmazonBedrockFullAccess policy', 'yellow');
      log('   3. Or add this custom policy:', 'yellow');
      log('   {', 'yellow');
      log('     "Effect": "Allow",', 'yellow');
      log('     "Action": ["bedrock:InvokeModel"],', 'yellow');
      log('     "Resource": "*"', 'yellow');
      log('   }', 'yellow');
    } else if (error.name === 'ResourceNotFoundException') {
      log('\n🔍 Diagnosis: Model Not Found', 'yellow');
      log('   The Nova Pro model is not available in region:', region, 'yellow');
      log('\n💡 Solution:', 'yellow');
      log('   1. Try a different region (us-west-2, us-east-1)', 'yellow');
      log('   2. Update AWS_REGION in .env.local', 'yellow');
      log('   3. Verify model availability in your region', 'yellow');
    } else if (error.code === 'CredentialsProviderError' || error.code === 'InvalidSignatureException') {
      log('\n🔍 Diagnosis: Invalid Credentials', 'yellow');
      log('   Your AWS credentials are incorrect or expired', 'yellow');
      log('\n💡 Solution:', 'yellow');
      log('   1. Go to AWS Console → IAM → Users', 'yellow');
      log('   2. Select your chatbot user', 'yellow');
      log('   3. Go to Security Credentials tab', 'yellow');
      log('   4. Create new access key', 'yellow');
      log('   5. Update .env.local with new credentials', 'yellow');
    } else {
      log('\n💡 General troubleshooting:', 'yellow');
      log('   1. Check CHATBOT_SETUP.md for detailed setup instructions', 'yellow');
      log('   2. Verify your AWS account has Bedrock access', 'yellow');
      log('   3. Ensure billing is enabled on your AWS account', 'yellow');
      log('   4. Try a different AWS region', 'yellow');
    }
  }

  log('\n' + '━'.repeat(50), 'blue');
  log('📖 For detailed setup instructions, see: CHATBOT_SETUP.md\n', 'blue');
}

// Run the diagnostic
testChatbotConnection().catch((error) => {
  log('\n❌ Diagnostic script failed:', 'red');
  console.error(error);
  process.exit(1);
});
