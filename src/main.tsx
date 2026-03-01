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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </RecoilRoot>,
);
