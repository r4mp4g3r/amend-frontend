import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter} from "react-router-dom"
// import { AuthCheckProvider } from './Context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthCheckProvider> */}
    <BrowserRouter>
      <Toaster/>
      <App />
    </BrowserRouter>
    {/* </AuthCheckProvider> */}
  </React.StrictMode>,
)
