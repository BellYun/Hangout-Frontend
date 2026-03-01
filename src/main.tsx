import React from 'react';
import ReactDOM from 'react-dom/client';
import { getClient } from './queryClient';
import { worker } from './mocks/workers';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

declare global {
  interface Window {
    naver: any;
  }
}

// if(import.meta.env.DEV){
//   worker.start();
// }
//const queryClient = getClient();

const queryClient = new QueryClient();

const loadDeferredFonts = () => {
  if (document.getElementById('deferred-font-styles')) {
    return;
  }

  const link = document.createElement('link');
  link.id = 'deferred-font-styles';
  link.rel = 'stylesheet';
  link.href = new URL('./assets/font/font.css', import.meta.url).href;
  document.head.appendChild(link);
};

const scheduleDeferredFontLoad = () => {
  const requestIdleCallback = (window as any).requestIdleCallback as
    | ((callback: () => void, options?: { timeout: number }) => number)
    | undefined;

  if (requestIdleCallback) {
    requestIdleCallback(loadDeferredFonts, { timeout: 2000 });
    return;
  }

  window.setTimeout(loadDeferredFonts, 1200);
};

scheduleDeferredFontLoad();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </RecoilRoot>,
);
