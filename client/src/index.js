import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = "pk_test_cG9zaXRpdmUtc2F0eXItNzcuY2xlcmsuYWNjb3VudHMuZGV2JA";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>
);
