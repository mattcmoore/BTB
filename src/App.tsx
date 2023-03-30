import './App.css'
import LoginForm from './components/LoginForm'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={
            <LoginForm/>
          }/>
        </Routes>
      </Router>
    </div>
  )

}
export default App
