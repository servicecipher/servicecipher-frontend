import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = "pk_live_Y2xlcmsuc2VydmljZWNpcGhlci5jb20k";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    frontendApi="clerk.servicecipher.com"
  >
    <App />
  </ClerkProvider>
);