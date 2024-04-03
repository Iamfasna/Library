import React from 'react'
import '../styles/Home.css'


function Home() {

    const handleSubmit = () =>{
       
    
      }
  return (
    <div className="container">
    <img src="https://lh3.googleusercontent.com/p/AF1QipPDkv-KBx-ntBf4DARPuGgJrUXB4pmI_Eb9a153=s1360-w1360-h1020" alt="school" className="image" />
    <div className="login-form">
      <h2>Login</h2>
      <form  onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
  )
}

export default Home