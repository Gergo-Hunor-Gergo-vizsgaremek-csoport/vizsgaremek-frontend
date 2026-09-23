import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {ServiceProvider} from "./services/ServiceContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ServiceProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ServiceProvider>
  </StrictMode>,
)
