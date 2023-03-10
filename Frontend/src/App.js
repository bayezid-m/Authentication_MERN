import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

const App = () => {
	return (
		
			<BrowserRouter>
      <Routes>
				<Route path="/login" element={<Login/>} />
				<Route path="/" element={<Register/>} />
				<Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
			</BrowserRouter>
		
	)
}

export default App
