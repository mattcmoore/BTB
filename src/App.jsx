import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
import SignUpForm from "./components/SignupForm/SignUpForm";
import NewClassForm from "./components/NewClassForm/NewClassForm"
import ResetPassword from "./components/ResetPass/ResetPassword";
import { BtbProvider } from "./context/BtbContext";

function App() {
  return (
    <div className="App">
      <BtbProvider>
        <Router>
          <Routes>
            <Route exact={true} path="/" element={<ProtectedHome />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/newclass" element={<NewClassForm />}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
          </Routes>
        </Router>
      </BtbProvider>
    </div>
  );
}
export default App;
