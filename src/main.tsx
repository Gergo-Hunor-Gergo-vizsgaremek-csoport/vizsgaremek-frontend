import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {ServiceProvider} from "./services/ServiceContext.tsx";
import {LoginProvider} from "./services/LoginContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ServiceProvider>
          <LoginProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
              </LoginProvider>
      </ServiceProvider>
  </StrictMode>,
)
