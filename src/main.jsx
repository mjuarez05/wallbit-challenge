import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lines from '../components/Lines.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Lines />
    <App />
  </StrictMode>,
)
