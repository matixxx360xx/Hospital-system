import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err))
  }, [])

  function Login() {
    const doctor = doctors.find(d => d.login === login);
    if (doctor && password === doctor.password) {
      alert("Zalogowano pomyślnie!")
    } else {
      alert("Nieprawidłowy login lub hasło.")
    } 
    setLogin("")
    setPassword("")
  }

  return (
    <>
      <div className='login'>
        <div className='field'>
          <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
          <div className='userLogin'>Login</div>
        </div>
        <div className='field'>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='userPassword'>Hasło</div>
        </div>
        <button onClick={Login}>Zaloguj</button>
      </div>
    </>
  )
}

export default App
