import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={
            <LoginForm/>
          }/>
          <Route path='/admin' element={
            <AdminDashboard/>
          }/>
        </Routes>
      </Router>
    </div>
  )

}
export default App
