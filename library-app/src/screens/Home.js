import React, { useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const Navigate = useNavigate();

  axios.defaults.withCredentials= true  
  const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:5000/", { email, password })
        .then(result => {
          console.log(result);
          if (result.data.success === true) {
            Navigate('/adminHome');
          }
        })
        .catch(error => {
         // console.log(error.response && error.response.data)
          if (error.response && error.response.data ) {
           // const errorArray = error.response.data.error
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage('An error occurred while logging in.');
            console.error('Error occurred:', error);
          }
        });
       
    
      }
  return (
    <div className="container">
    <img src="https://lh3.googleusercontent.com/p/AF1QipPDkv-KBx-ntBf4DARPuGgJrUXB4pmI_Eb9a153=s1360-w1360-h1020" alt="school" className="image" />
    <div className="login-form">
      <h2>Login</h2>
      <form  onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(event) => { setEmail(event.target.value); }}/>
        <input type="password" placeholder="Password" required  onChange={(event) => { setPassword(event.target.value); }} />
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
           <p> {errorMessage} </p> 
          </div>
        )}
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
  )
}

export default Home