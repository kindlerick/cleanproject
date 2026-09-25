import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from "./components/Header";
import Footer from "./components/Footer";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>

    <Header />    

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blogs" element={<BlogPage />} /> 
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

    <Footer />

    </BrowserRouter>
  )
}

export default App