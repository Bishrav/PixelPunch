import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import Signup from './Signup.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <Signup />
  </StrictMode>,
)
