import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextContainer from './context/AdminContextContainer'

createRoot(document.getElementById('root')).render(
  <AdminContextContainer>
    <App />
  </AdminContextContainer>
)
