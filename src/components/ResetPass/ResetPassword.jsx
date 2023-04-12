import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BtbContext from "../../context/BtbContext";
import BTBlogo from "../../assets/blue-ocean-logo-2.png";
import "./ResetPassword.css";

const ResetPassword = () => {
  const {fetchURL} = useContext(BtbContext)
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const Navigate = useNavigate()

  const handleResetPassword = async () => {
    try {


      const response = await fetch(`${fetchURL}/resetPass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      if (data.msg === "sent" || response.status === 204) {
        setMessage("A reset password link has been sent to your email.");
        Navigate('/')
      } else {
        setMessage("Failed to send the reset password link. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="containerReset">
      <div className="resetAndTitle">
        <div id="logoCont">
          <img src={BTBlogo} className="loginLogo"></img>
        </div>
        <h3 className="slogan">Charting the Path to Your Next Mission</h3>
        <div className="form-group">
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
              className="resetInput"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="resetBtnCont">
          <button className="resetBtn" onClick={handleResetPassword}>
            Send Reset Password Link
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
