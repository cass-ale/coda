import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'
import { HideContextProvider } from './context/HideContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <HideContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </HideContextProvider>
  </ChatContextProvider>
  </AuthContextProvider>,
)
