import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="976760343929-09hgnhbvfhvh4u3ngptthkvhv66r35oq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
