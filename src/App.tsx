import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminDashboard from '.components/AdminDashboard/AdminDashboard'
import StudentDashboard from "./components/StudentDashboard/StudentDashboard"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={
            <LoginForm/>
          }>
          <Route path='/admin' element={
            <AdminDashboard/>
          }/>
          <Route path='/student' element={
            <StudentDashboard/>
          }/>
        </Routes>
      </Router>
      {/* <LoginForm /> */}
      {/* <AdminDashboard /> */}
      <StudentDashboard />
    </div>
  )
}
export default App
