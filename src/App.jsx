import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
import SignUpForm from "./components/SignupForm/SignUpForm";
import NewClassForm from "./components/NewClassForm/NewClassForm"
import { BtbProvider } from "./context/BtbContext";

import Chatbar from "./components/ChatBar/Chatbar";

function App() {
  return (
    <div className="App">
      <BtbProvider>
        <Router>
          <Routes>
            <Route exact={true} path="/" element={<ProtectedHome />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/newclass" element={<NewClassForm />}/>
            <Route path='/chat-test' element={<Chatbar />}/>
          </Routes>
        </Router>
      </BtbProvider>
    </div>
  );
}
export default App;
