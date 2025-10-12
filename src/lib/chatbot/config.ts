/**
 * Chatbot Configuration
 * Centralized configuration for the NMTSA chatbot widget
 */

export const chatbotConfig = {
  // Model Configuration
  model: {
    id: 'amazon.nova-pro-v1:0',
    region: process.env.AWS_REGION || 'us-east-1',
    maxTokens: 500, // Maximum length of AI responses
    temperature: 0.3, // Lower = more focused, Higher = more creative (0.0-1.0)
    topP: 0.9, // Diversity of responses (0.0-1.0)
  },

  // UI Configuration
  ui: {
    position: 'bottom-right', // Position of chat widget
    colors: {
      primary: 'from-amber-500 to-orange-600', // Gradient for buttons and header (updated to match NMTSA theme)
      userMessage: 'from-amber-500 to-orange-600', // User message background
      assistantMessage: 'bg-white/80', // Assistant message background with glass effect
    },
    dimensions: {
      width: 'w-[400px]', // Chat window width
      height: 'h-[600px]', // Chat window height
    },
    welcomeMessage: "Hi! I'm here to help you learn more about NMTSA and our neurologic music therapy services. How can I assist you today?",
  },

  // Conversation Configuration
  conversation: {
    maxHistoryLength: 5, // Number of previous messages to send for context
    showTimestamps: true, // Show message timestamps
  },

  // Response Guidelines
  guidelines: {
    maxResponseLength: '2-3 sentences when possible',
    tone: 'friendly, professional, and compassionate',
    onUnknownQuestion: "I don't have that specific information, but I recommend contacting NMTSA directly or requesting a consultation for personalized assistance.",
    encourageActions: [
      'Request a consultation',
      'Contact the organization',
      'Fill out forms',
      'Visit specific pages for more details',
    ],
  },

  // Feature Flags
  features: {
    enableTypingIndicator: true,
    enableSoundNotifications: false,
    enableConversationPersistence: false, // Future: Save conversations to database
    enableAnalytics: false, // Future: Track common questions
  },
};

/**
 * Get system prompt for RAG implementation
 * @param context - Website context document content
 * @returns Formatted system prompt
 */
export function getSystemPrompt(context: string): string {
  return `You are a helpful assistant for NMTSA (Neurologic Music Therapy Services of Arizona). 

IMPORTANT INSTRUCTIONS:
- You must ONLY answer questions based on the context provided below
- If the question is not related to NMTSA or the information in the context, politely decline and redirect to NMTSA-related topics
- Keep your responses concise and helpful (${chatbotConfig.guidelines.maxResponseLength})
- Be ${chatbotConfig.guidelines.tone}
- If you don't know the answer based on the context, say "${chatbotConfig.guidelines.onUnknownQuestion}"
- Always encourage users to: ${chatbotConfig.guidelines.encourageActions.join(', ')}
- Do not make up information that is not in the context
- When providing links or URLs, include the complete URL starting with https:// so users can click on them
- If the user asks for any form, page, or service, always provide the direct clickable link from the context
- Format URLs on their own line or with clear spacing for better visibility
- When listing multiple links, present them clearly with the page/form name followed by the URL

CONTEXT ABOUT NMTSA:
${context}

Now, please answer the user's question based only on the above context.`;
}

/**
 * Error messages for different scenarios
 */
export const errorMessages = {
  noCredentials: 'Chatbot service is not configured properly. Please contact support.',
  apiError: 'An error occurred processing your request. Please try again.',
  connectionError: "I apologize, but I'm having trouble connecting right now. Please try again later or contact us directly.",
  validationError: 'Invalid request. Please try again.',
  accessDenied: 'Service access denied. Please contact support.',
};

/**
 * Validate configuration
 * @returns true if configuration is valid, throws error otherwise
 */
export function validateConfig(): boolean {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local');
  }
  return true;
}

export default chatbotConfig;
