import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import StudentDashboard from './components/StudentDashboard/StudentDashboard'
import SignUpForm from './components/SignupForm/SignUpForm'
import Chat from './components/Chat/Chat'
import {BtbProvider} from './context/BtbContext'

function App() {

  return (

    <div className="App">
      <BtbProvider>
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
          <Route path='/chat-test' element={
            <Chat to='1' from='2'/>
          }/>
        </Routes>
      </Router>
      </BtbProvider>
    </div>
  )
}
export default App
