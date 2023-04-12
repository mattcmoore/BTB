import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
import SignUpForm from "./components/SignupForm/SignUpForm";
import NewClassForm from "./components/NewClassForm/NewClassForm";
import ResetPassword from "./components/ResetPass/ResetPassword";
import ProtectedAdmin from "./components/ProtectedRoutes/ProtectedAdmin";
import ProtectedStudent from "./components/ProtectedRoutes/ProtectedStudent";
import ProtectedUser from "./components/ProtectedRoutes/ProtectedUser";
import { BtbProvider } from "./context/BtbContext";

function App() {
  return (
    <div className="App">
      <BtbProvider>
        <Router>
          <Routes>
            <Route exact={true} path="/" element={<ProtectedHome />} />
            <Route
              path="/signup"
              element={
                <ProtectedUser>
                  <SignUpForm />
                </ProtectedUser>
              }
            />
            <Route
              path="/newclass"
              element={
                <ProtectedAdmin>
                  <NewClassForm />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/resetPassword"
              element={
                <ProtectedUser>
                  <ResetPassword />
                </ProtectedUser>
              }
            />
          </Routes>
        </Router>
      </BtbProvider>
    </div>
  );
}
export default App;
