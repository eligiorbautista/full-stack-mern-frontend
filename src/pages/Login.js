import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('https://full-stack-mern-api.onrender.com/api/login', {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        email, 
        password, 
      }),
    })


    const data = await response.json(); // convert response data to json
    if (data.user) {

      localStorage.setItem('token', data.user);

      alert('Login successful');
      console.log('Login successful ✔');
      window.location.href = '/dashboard';
    } 
    else {
      alert('Invalid email / password ✘\nPlease check your email and password and try again.')
      setEmail('');
      setPassword('');
    }

    console.log(data);
  }

  return (
    <div className="App">
      <h1>Log In</h1>
      <form onSubmit={loginUser}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <p>Don't have an account yet? <Link to={'/register'}>Register</Link></p>
        <input type="submit" value="Log In"/>
      </form>
      <br/>
      <small><i>Created by Eli Bautista.</i></small>
    </div>
     
      
  );
}

export default Login;
