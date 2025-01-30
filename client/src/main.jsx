import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GirafProvider } from './context/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GirafProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GirafProvider>
  </StrictMode>,
)
