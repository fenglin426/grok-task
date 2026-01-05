import axios from 'axios';

export interface GrokResponse {
  success: boolean;
  content?: string;
  error?: string;
  usage?: any;
}

class GrokClient {
  private apiKey: string;
  private apiBase: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GROK_API_KEY || '';
    this.apiBase = process.env.GROK_API_BASE || '';
    this.model = process.env.GROK_MODEL || 'grok-4.1-fast';
  }

  async chat(prompt: string, options: { temperature?: number; max_tokens?: number } = {}): Promise<GrokResponse> {
    try {
      const response = await axios.post(
        `${this.apiBase}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 4000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      return {
        success: true,
        content: response.data.choices[0].message.content,
        usage: response.data.usage
      };
    } catch (error: any) {
      console.error('Grok API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  async executeTask(taskPrompt: string): Promise<GrokResponse> {
    console.log(`🚀 Executing Grok task...`);
    const result = await this.chat(taskPrompt);

    if (result.success) {
      console.log(`✅ Task completed successfully`);
    } else {
      console.error(`❌ Task failed: ${result.error}`);
    }

    return result;
  }
}

export const grokClient = new GrokClient();
