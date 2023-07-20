const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Todo = require('./model/todo')

app.use(cors())
app.use(express.json())
//mongoose.connect('mongodb://localhost:27017')
mongoose.connect('mongodb+srv://root:root@ojana.kysbbli.mongodb.net/?retryWrites=true&w=majority')
app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{  
				id : user._id,
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/api/todos', async (req, res) => {
	console.log(req.body)
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		//const id = decoded.id
		await Todo.create({
			text: req.body.text,
			done: req.body.done,
			email: decoded.email,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})
app.get('/api/todos', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await Todo.find({ email: email })
		return res.json({ status: 'ok', user: user, email: email })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token hr' })
	}
})
app.delete('/api/todos/(:id)', async (req, res) => {
	//const token = req.headers['x-access-token']
	const id = req.params.id;
	try {
		// const decoded = jwt.verify(token, 'secret123')
		// const email = decoded.email
		const user = await Todo.findByIdAndDelete(id);
		await user.remove();
		//return res.json({ status: 'ok', user: user })
		console.log(id);
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token hr' })
	}
})
app.get('/api/todos/(:id)', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await Todo.findById(id);
		return res.json({ status: 'ok', user: user })
		//console.log(user: user);
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token hr' })
	}
})
app.post('/api/todos/(:id)', async (req, res) => {
	const id = req.params.id;
	console.log(req.body.text);
	try {
		await Todo.updateOne({_id: id}, {
			text: req.body.text,
			done: req.body.done
		}).then(()=>{
			return res.json({ status: 'ok'})
		})
		
		//console.log(user: user);
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token hr' })
	}
})


















// app.post('/logout', (req, res) =>{
	
// })

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote, name: user.name })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})



app.listen(2000, ()=>{
    console.log('Server is running on port 2000.');
})