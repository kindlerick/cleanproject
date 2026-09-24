import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
  return <h1>Home</h1>
}

function Login() {
  return <h1>Login</h1>
}

function Register() {
  return <h1>Register</h1>
}

function Profile() {
  return <h1>Profile</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App