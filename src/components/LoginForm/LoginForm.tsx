// src/LoginForm.tsx
import React, { useState, FormEvent } from "react";
import "./LoginForm.css";
import BTBlogo from "../../assets/blue-ocean-logo-2.png";
import { Link } from "react-router-dom";

// Define the interface for the form state
interface FormState {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Initialize form state
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const login = async () =>{
      await fetch('/login', {
          method: "POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formState)
      })
  }
    login()
  };

  return (
    <div className="containerLogin">
      <div className="loginAndTitle">
        <div id="logoCont">
          <img src={BTBlogo} className="loginLogo"></img>
        </div>
        <h3 className="slogan">Charting the Path to Your Next Mission</h3>
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="loginCont">
            <div className="emailCont">
              <label htmlFor="email" className="inputEx">
                Email:
              </label>
              <div className="leftInput">
                <svg
                  style={{
                    width: "30px",
                    height: "30px",
                    paddingTop: "8px",
                    paddingLeft: "2px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
              <input
                className="loginInput"
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="passCont">
              <label htmlFor="password" className="inputEx">
                Password:
              </label>
              <div className="leftInputPass">
                <svg
                  style={{ width: "30px", height: "25px", paddingTop: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <input
                className="loginInput"
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="btnCont">
              <button type="submit" className="loginBtn">
                Log In
              </button>
            </div>
            <div className="newStuCont">
              <Link to="/signup" className="newStuLink">
                New Student?
              </Link>
            </div>
            <div className="forgCont">
              <a className="forgLink">Forgot Password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
