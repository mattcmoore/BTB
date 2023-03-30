import './App.css'
import StudentDashboard from "./components/StudentDashboard/StudentDashboard"
import AdminDashboard from './components/AdminDashboard/AdminDashboard.tsx'

function App() {

  return (
    <>
      {/* <LoginForm /> */}
      <AdminDashboard />
      <StudentDashboard />
    </>
  )

}
export default App
