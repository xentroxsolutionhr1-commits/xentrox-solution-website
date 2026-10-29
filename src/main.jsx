import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Spinner from './components/common/Spinner.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
);
