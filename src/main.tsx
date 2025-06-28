import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
    <Analytics />
  </React.StrictMode>,
);
