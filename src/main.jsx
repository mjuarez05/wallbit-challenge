import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dots from '../components/Dots.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Dots />
  </StrictMode>,
)
