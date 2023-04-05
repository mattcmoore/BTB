import React, { useState, useContext } from 'react';
import './NewClassForm.css';
import BTBLogo from '../../assets/blue-ocean-logo-2.png';
import BtbContext from '../../context/BtbContext.jsx';

const NewClassForm = () => {
  const { createNewClass } = useContext(BtbContext);

  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    mcsp_name: '',
    instructor: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [randomCode, setRandomCode] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData);

    const code = generateRandomCode();
    console.log(code);

    try {
      await createNewClass({
        start_date: formData.start_date,
        end_date: formData.end_date,
        code: code,
        mcsp_name: formData.mcsp_name,
      });

      setFormSubmitted(true);
      setRandomCode(code);
      setIsSubmitDisabled(true);
    } catch (error) {
      console.error(error);
      alert('Failed to create class');
    }
  };

  const generateRandomCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length)));
    return `${randomLetters.join('')}${randomNumber}`;
  };

  return (
    <div id="contCont">
      <form onSubmit={handleSubmit} className="signCont">
        <img src={BTBLogo} id="imgSign" alt="BTB Logo" />
        <div id="hide" style={{ display: formSubmitted ? 'none' : 'block' }}>
          <label htmlFor="mcsp_name">Class Name:</label>
          <input
            type="text"
            name="mcsp_name"
            value={formData.mcsp_name}
            onChange={handleChange}
            className="inputSign"
            required
          />
          <br />

          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="inputSign"
            required
          />
          <br />

          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="inputSign"
            required
          />
          <br />

          <label htmlFor="instructor">Instructor:</label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="inputSign"
            required
          />
        </div>
        <br />
        <br />

        {formSubmitted ? (
          <div id="codediv">
            <p>Your class has been created!</p>
            <p>Share the class code to any new students to assign them to this class.</p>
            <p id="randomCode">Class code:</p>
            <h1>{randomCode}</h1>
          </div>
        ) : (
          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
        )}
        {isSubmitDisabled && (
          <button onClick={() => window.location.href = "/admindashboard"}>Return Home</button>
        )}
      </form>
    </div>
  );
};

export default NewClassForm;
