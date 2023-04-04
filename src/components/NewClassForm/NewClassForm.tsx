import React, { useState } from 'react';
import './NewClassForm.css'
import BTBlogo from '../../assets/blue-ocean-logo-2.png'

type FormData = {
  classname: string;
  startdate: string;
  enddate: string;
  instructor: string;
};

const NewClassForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    classname: '',
    startdate: '',
    enddate: '',
    instructor: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [randomCode, setRandomCode] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  
    const code = generateRandomCode();
    console.log(code);
  
    setFormSubmitted(true);
    setRandomCode(code);
    setIsSubmitDisabled(true);
  };

  const generateRandomCode = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length)));
    return `${randomLetters.join('')}${randomNumber}`;
  };

  return (
    <div id='contCont'>
      <form onSubmit={handleSubmit} className='signCont'>
        <img src={BTBlogo} id='imgSign'/>
        <div id='hide' style={{display: formSubmitted ? 'none' : 'block'}}>
          <label htmlFor="code">Class Name:</label>
          <input type="text" name="classname" value={formData.classname} onChange={handleChange} className='inputSign' required/>
          <br />
          
          <label htmlFor="name">Start Date:</label>
          <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} className='inputSign' required/>
          <br />
          <label htmlFor="email">End Date:</label>
          <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} className='inputSign' required/>
          <br />
  
          <label htmlFor="password">Instructor:</label>
          <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} className='inputSign' required/>
        </div>
        <br />
        <br />
        {formSubmitted && (
          <div id='codediv'>
            <p> Your class Has been Created! Share the class code to any new students to assign them to this class</p>
            <p id='randomCode'>Class code:</p>
            <h1>{randomCode}</h1>
          </div>
        )}
        <button type="submit" disabled={isSubmitDisabled}>Submit</button>
      </form>
    </div>
  );
};

export default NewClassForm;
