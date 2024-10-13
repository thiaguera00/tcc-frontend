import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './Home/App'
import './index.css'
import GerarQuestao from './Questoes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GerarQuestao />
  </StrictMode>,

  
)
