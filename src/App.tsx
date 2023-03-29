import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AdminDashboard from './components/AdminDashboard.tsx'
import './App.css'

const App = () => {
  return (
    <>
      <LoginForm />
      <AdminDashboard />
      <StudentDashboard />
    </>
  )

}
export default App
