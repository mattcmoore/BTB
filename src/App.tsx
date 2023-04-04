import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import StudentDashboard from './components/StudentDashboard/StudentDashboard'
import SignUpForm from './components/SignupForm/SignUpForm'
import NewClassForm from './components/NewClassForm/NewClassForm'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact={true} path='/' element={
            <LoginForm/>
          }/>
          <Route path='/admin' element={
            <AdminDashboard/>
          }/>
          <Route path='/student' element={
            <StudentDashboard/>
          }/>
          <Route path='/signup' element={
            <SignUpForm/>
          }/>
          <Route path='/newclass' element={
            <NewClassForm/>
          }/>
        </Routes>
      </Router>
    </div>
  )
}
export default App
