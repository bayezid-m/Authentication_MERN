import React,{useState, useEffect} from 'react'
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'

export default function Update() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;

    const [text, setText] = useState('')
	const [done, setDone] = useState('')
	// const [todos, setTodos] = useState({
    //     text: "",
    //     done: "",
    // });
    const [todos, setTodos] = useState('');
	
    
	async function Quote() {
        //const id = useParams();
        //console.log(id);
		const req = await fetch(`http://localhost:2000/api/todos/${id}`, {
            method: 'GET',
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		if (data.status === 'ok') {
			setTodos(data.user)
            setText(data.user.text)
            setDone(data.user.done)
			console.log(data.user);
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
    const onInputChange = (e) => {
        setTodos({ ...todos, [e.target.name]: e.target.value });
       
        //setDone({ ...done, [e.target.name]: e.target.value })
      };
   

      const onSubmit = async (event) => {
        //setText(todos.text);
      
        console.log(text);
        console.log(done);
        event.preventDefault();
		const response = await fetch(`http://localhost:2000/api/todos/${id}`, {
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
            navigate("/dashboard");
			
		} 
        //navigate("/");
      };
  return (
    <div>{id},{todos.text}, {todos.done},
    <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Content
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your todo content"
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Is it complete?
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter YES if it is done or NO"
                  name="done"
                  value={done}
                  onChange={(e) => setDone(e.target.value)}
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <Link className="btn btn-secondary mx-2" to="/">
                Cancel
              </Link>
            </form>
    </div>
  )
}
