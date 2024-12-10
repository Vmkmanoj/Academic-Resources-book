import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QuizzApp } from './QuizzApp';
import './index.css';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizzApp />
  </StrictMode>
);
