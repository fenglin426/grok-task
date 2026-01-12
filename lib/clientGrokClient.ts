// 浏览器端 Grok API 客户端
export interface GrokResponse {
  success: boolean;
  content?: string;
  error?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ApiConfig {
  apiKey: string;
  apiBase: string;
  model: string;
}

export async function callGrokAPI(
  prompt: string,
  config: ApiConfig,
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<GrokResponse> {
  try {
    if (!config.apiKey || !config.apiBase) {
      return {
        success: false,
        error: '请先配置 API 密钥和地址',
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    const response = await fetch(`${config.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model || 'grok-4.1-fast',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 4000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        success: false,
        error: 'API 返回数据格式错误',
      };
    }

    return {
      success: true,
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  } catch (error: any) {
    console.error('Grok API Error:', error);

    if (error.name === 'AbortError') {
      return {
        success: false,
        error: '请求超时（30秒），请稍后重试',
      };
    }

    return {
      success: false,
      error: error.message || '网络请求失败，请检查网络连接',
    };
  }
}

export async function executeTask(prompt: string, config: ApiConfig): Promise<GrokResponse> {
  console.log('🚀 Executing Grok task...');
  const result = await callGrokAPI(prompt, config);

  if (result.success) {
    console.log('✅ Task completed successfully');
  } else {
    console.error('❌ Task failed:', result.error);
  }

  return result;
}
