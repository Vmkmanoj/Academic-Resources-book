import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import { CompilerApp } from './CompilerApp'; // Assuming CompilerApp is a .tsx file
import React from 'react';

const rootElement = document.getElementById('root') as HTMLElement; // Type casting to HTMLElement

createRoot(rootElement).render(
  <StrictMode>
    <CompilerApp />
  </StrictMode>
);
