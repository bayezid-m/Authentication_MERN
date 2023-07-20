import React, { useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
	
	const [text, setText] = useState('')
	const [done, setDone] = useState('')
	const [todos, setTodos] = useState([])
	const [email, setEmail] = useState('')
    
	async function Quote() {
		const req = await fetch('http://localhost:2000/api/todos', {
            method: 'GET',
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		if (data.status === 'ok') {
			setTodos(data.user)
			console.log(data.user);
			setEmail(data.email)
			console.log(data.email);
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
        //Quote();
		const token = localStorage.getItem('token')
        if (!token) {
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


	async function addTodo (event) {
		event.preventDefault();
		const response = await fetch('http://localhost:2000/api/todos', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token'),
		  },
		  body: JSON.stringify({
			text,
			done,
		}),
		})
		const data = await response.json();
		if (data.status === 'ok') {
			console.log("everything okay");
			navigate('/dashboard');
			setText('')
			setDone('')
			Quote();
		} 
	  }
	  //console.log(todos.text);
	  async function deleteTodo(id) {
		try {
			const res = await fetch(`http://localhost:2000/api/todos/${id}`, {
			  method: 'DELETE',
			  headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			  },
			});
			const data = await res.json();
			if (data.status === 'ok') {
			  console.log('Todo deleted successfully');
			  Quote();
			}
		  } catch (err) {
			console.error(err);
		  }
	  };
	  function showTodo(id){
		navigate("/update", {state:id})
	  }
	  
	return (
		<div>
		<h2>Todo content of: {email}</h2>
			<form onSubmit={addTodo}>
			<input placeholder={'What do you want to do?'}
					value={text}
					type="text"
					onChange={(e) => setText(e.target.value)}/>
			<input placeholder={'is it complete?'}
					value={done}
					type="text"
					onChange={(e) => setDone(e.target.value)}/>
					<input type="submit" value="add" />
    		</form>
    		<ul>{todos.map(todo =>(
				<li>{todo.text}, 
				{todo.done}, 
				<input type="submit" value="Delete" onClick={()=> deleteTodo(todo._id)}/>
					<button onClick={()=>showTodo(todo._id)}>Update</button>	
				</li>
			))}
   			 </ul>
				<input type="submit" value="Logout" onClick={logout}/>
		</div>
	)
}

export default Dashboard;