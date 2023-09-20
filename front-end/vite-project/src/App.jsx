import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Courses from './Components/Courses';
import Bar from './Components/Bar';
import SignUp from './Components/Signup';
import Upload from './Components/Upload';
import Course from './Components/Course';
import Doubts from './Components/Doubts';
import Chat from './Components/Chat';
import Home from './Components/Homepage/Home';
// front-end/vite-project/src/Components/Homepage/Home.jsx

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Bar></Bar>
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/course/:courseId" element={<Course/>}/>
          <Route path="/doubts" element={<Doubts/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
