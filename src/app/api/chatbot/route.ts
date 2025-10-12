import { NextRequest, NextResponse } from 'next/server';
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { chatbotConfig, getSystemPrompt, errorMessages } from '@/lib/chatbot/config';
import { getWebsiteContext } from '@/lib/chatbot/website-context';

// Initialize Bedrock client
const client = new BedrockRuntimeClient({
  region: chatbotConfig.model.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Load website context from TypeScript constant (works reliably in Vercel)
const websiteContext = getWebsiteContext();
console.log('[Chatbot] Context loaded from TypeScript constant, length:', websiteContext.length);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate AWS credentials
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials not configured');
      return NextResponse.json(
        { error: errorMessages.noCredentials },
        { status: 500 }
      );
    }

    // Build conversation history
    const conversationHistory = history?.slice(-chatbotConfig.conversation.maxHistoryLength) || [];

    // Create system prompt with RAG context
    const systemPrompt = getSystemPrompt(websiteContext);

    // Prepare messages for Nova Pro
    const messages = [
      ...conversationHistory.map((msg: Message) => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      {
        role: 'user',
        content: [{ text: message }],
      },
    ];

    // Call AWS Bedrock Nova Pro
    const command = new ConverseCommand({
      modelId: chatbotConfig.model.id,
      messages: messages,
      system: [{ text: systemPrompt }],
      inferenceConfig: {
        maxTokens: chatbotConfig.model.maxTokens,
        temperature: chatbotConfig.model.temperature,
        topP: chatbotConfig.model.topP,
      },
    });

    const response = await client.send(command);

    // Extract the response text
    const responseText = response.output?.message?.content?.[0]?.text || 
      errorMessages.connectionError;

    return NextResponse.json({
      response: responseText,
      model: chatbotConfig.model.id,
    });

  } catch (error: any) {
    console.error('Error in chatbot API:', error);
    
    // Handle specific AWS errors
    if (error.name === 'ValidationException') {
      return NextResponse.json(
        { error: errorMessages.validationError },
        { status: 400 }
      );
    }
    
    if (error.name === 'AccessDeniedException') {
      return NextResponse.json(
        { error: errorMessages.accessDenied },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        error: errorMessages.apiError,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
