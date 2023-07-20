import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Update from './components/Update'
const App = () => {
	return (
		
			<BrowserRouter>
      <Routes>
				<Route path="/login" element={<Login/>} />
				<Route path="/" element={<Register/>} />
				<Route path="/dashboard" element={<Dashboard/>} />
				<Route path="/update" element={<Update/>} />
        </Routes>
			</BrowserRouter>
		
	)
}

export default App
