import React, { useState } from 'react';

type FormData = {
  code: string;
  name: string;
  email: string;
  password: string;
  separationDate: string;
  branch: string;
  hasFamily: boolean;
  livesInBarracks: boolean;
};

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    code: '',
    name: '',
    email: '',
    password: '',
    separationDate: '',
    branch: '',
    hasFamily: false,
    livesInBarracks: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="code">Code:</label>
      <input type="text" name="code" value={formData.code} onChange={handleChange} required/>
      <br />
      
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
      <br />
      <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
        <br />

        <label htmlFor="separationDate">Separation Date:</label>
        <input type="date" name="separationDate" value={formData.separationDate} onChange={handleChange} required/>
        <br />

        <label htmlFor="branch">Branch:</label>
        <select name="branch" value={formData.branch} onChange={handleChange}>
            <option value="">--Select a branch--</option>
            <option value="army">Army</option>
            <option value="navy">Navy</option>
            <option value="airforce">Air Force</option>
            <option value="marines">Marines</option>
            <option value="coastguard">Coast Guard</option>
            <option value="spaceforce">Space Force</option>
        </select>
        <br />

        <label htmlFor="hasFamily">Has Family:</label>
        <input
            type="checkbox"
            name="hasFamily"
            checked={formData.hasFamily}
            onChange={handleCheckboxChange}
        />
        <br />

        <label htmlFor="livesInBarracks">Lives in Barracks:</label>
        <input
            type="checkbox"
            name="livesInBarracks"
            checked={formData.livesInBarracks}
            onChange={handleCheckboxChange}
        />
        <br />

        <button type="submit">Submit</button>
        </form>
  )
}
export default SignUpForm