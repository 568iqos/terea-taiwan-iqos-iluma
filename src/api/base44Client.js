import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

// 全域錯誤處理
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    // 不要讓未處理的 Promise 拒絕導致主控台有紅色警告
    if (event.reason && typeof event.reason === 'object') {
      const message = event.reason.message || String(event.reason);
      if (message.includes('404') || message.includes('Failed to fetch')) {
        console.warn('API 輸出不可用，使用預設值');
        event.preventDefault();
      }
    }
  });
}
