/**
 * Chatbot Setup Validation Script
 * Run this to check if your chatbot is configured correctly
 * 
 * Usage: node scripts/validate-chatbot-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🤖 NMTSA Chatbot Setup Validator\n');
console.log('='.repeat(50));

let hasErrors = false;

// Check 1: Environment variables
console.log('\n✓ Checking environment variables...');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  console.log('  ✅ .env.local file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasAccessKey = envContent.includes('AWS_ACCESS_KEY_ID=') && !envContent.includes('your_aws_access_key_id_here');
  const hasSecretKey = envContent.includes('AWS_SECRET_ACCESS_KEY=') && !envContent.includes('your_aws_secret_access_key_here');
  const hasRegion = envContent.includes('AWS_REGION=');
  
  if (hasAccessKey) {
    console.log('  ✅ AWS_ACCESS_KEY_ID is set');
  } else {
    console.log('  ❌ AWS_ACCESS_KEY_ID is not set or using example value');
    hasErrors = true;
  }
  
  if (hasSecretKey) {
    console.log('  ✅ AWS_SECRET_ACCESS_KEY is set');
  } else {
    console.log('  ❌ AWS_SECRET_ACCESS_KEY is not set or using example value');
    hasErrors = true;
  }
  
  if (hasRegion) {
    console.log('  ✅ AWS_REGION is set');
  } else {
    console.log('  ⚠️  AWS_REGION not set (will default to us-east-1)');
  }
} else {
  console.log('  ❌ .env.local file not found');
  console.log('  💡 Run: cp .env.local.example .env.local');
  hasErrors = true;
}

// Check 2: Required files
console.log('\n✓ Checking required files...');
const requiredFiles = [
  { path: 'src/components/ChatbotWidget.tsx', name: 'ChatbotWidget component' },
  { path: 'src/app/api/chatbot/route.ts', name: 'Chatbot API route' },
  { path: 'src/lib/chatbot/website-context.txt', name: 'Website context document' },
  { path: 'src/lib/chatbot/config.ts', name: 'Chatbot configuration' },
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file.path);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file.name}`);
  } else {
    console.log(`  ❌ ${file.name} not found at ${file.path}`);
    hasErrors = true;
  }
});

// Check 3: Dependencies
console.log('\n✓ Checking dependencies...');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const hasBedrockSDK = packageJson.dependencies && packageJson.dependencies['@aws-sdk/client-bedrock-runtime'];
  
  if (hasBedrockSDK) {
    console.log('  ✅ @aws-sdk/client-bedrock-runtime installed');
  } else {
    console.log('  ❌ @aws-sdk/client-bedrock-runtime not installed');
    console.log('  💡 Run: npm install @aws-sdk/client-bedrock-runtime');
    hasErrors = true;
  }
}

// Check 4: Layout integration
console.log('\n✓ Checking layout integration...');
const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
  const hasImport = layoutContent.includes('ChatbotWidget');
  const hasComponent = layoutContent.includes('<ChatbotWidget');
  
  if (hasImport && hasComponent) {
    console.log('  ✅ ChatbotWidget integrated in layout.tsx');
  } else {
    console.log('  ❌ ChatbotWidget not properly integrated in layout.tsx');
    if (!hasImport) console.log('  💡 Missing import statement');
    if (!hasComponent) console.log('  💡 Missing <ChatbotWidget /> component');
    hasErrors = true;
  }
}

// Check 5: Context file content
console.log('\n✓ Checking context document...');
const contextPath = path.join(__dirname, '..', 'src', 'lib', 'chatbot', 'website-context.txt');
if (fs.existsSync(contextPath)) {
  const contextContent = fs.readFileSync(contextPath, 'utf-8');
  const wordCount = contextContent.split(/\s+/).length;
  
  if (wordCount > 100) {
    console.log(`  ✅ Context document has sufficient content (${wordCount} words)`);
  } else {
    console.log(`  ⚠️  Context document is short (${wordCount} words)`);
    console.log('  💡 Consider adding more details for better responses');
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('\n❌ Setup validation failed!');
  console.log('Please fix the errors above and run this script again.\n');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed!');
  console.log('\nYour chatbot is ready to use. Start the dev server:');
  console.log('  npm run dev\n');
  console.log('Then visit http://localhost:3000 and look for the chat');
  console.log('icon in the bottom-right corner.\n');
  console.log('📚 See CHATBOT_SETUP.md for more information.\n');
}
