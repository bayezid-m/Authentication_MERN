import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import jwt_decode from "jwt-decode";
//import jwt from 'jsonwebtoken'
//import { useHistory } from 'react-router-dom'
//const jwt = require('jsonwebtoken')

const Dashboard = () => {
    const navigate = useNavigate();
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')
    const [name, setName] = useState('')
    
	async function Quote() {
		const req = await fetch('http://localhost:2000/api/quote', {
           // method: 'GET',
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(data.quote)
            setName(data.name)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
        //Quote();
		const token = localStorage.getItem('token')
		// if (token) {
		// 	const user = jwt.decode(token)
		// 	if (!user) {
		// 		localStorage.removeItem('token')
		// 		//history.replace('/login')
		// 	} else {
		// 		Quote()
		// 	}
		// }
        if (!token) {
			//const user = jwt.decode(token)
			
				localStorage.removeItem('token')
				navigate('/login');
			} else {
				Quote();
			}
		
        
	}, [])

    function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }

	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:2000/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
	}

	return (
		<div>
			<h1>{name || 'No name'}: {quote || 'No quote found'}</h1>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
                <br/>
                <input type="submit" value="Logout" onClick={logout}/>
			</form>
		</div>
	)
}

export default Dashboard;