import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './style.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PostItem from './pages/PostItem'
import ClaimItem from './pages/ClaimItem'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<PostItem />} />
        <Route path="/claim/:id" element={<ClaimItem />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


