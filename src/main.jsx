import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aktivnost from "./pages/Aktivnost";
import Volonter from "./pages/Volonter";
import Udruge from "./pages/Udruge";
import Login from "./pages/Login";
import Logout from "./pages/Login";
import Index from './pages/Index'
import Navbar from './components/Navbar';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

        <Routes>
          <Route path="/index/:isAdmin" element={<Index />} />
          <Route path="/volonter/:isAdmin" element={<Volonter />} />
          <Route path="/aktivnost/:isAdmin" element={<Aktivnost />} />
          <Route path="/udruge/:isAdmin" element={<Udruge />} />
          <Route path="/login" element={<Logout />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    
  </React.StrictMode>,
)
