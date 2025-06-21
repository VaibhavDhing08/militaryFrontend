import React, { useState } from 'react';
import api from '../api';  // corrected here too

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    base_id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      window.location.href = '/login';
    } catch (error) {
      alert('Signup failed. ' + (error.response?.data?.message || 'Unexpected error.'));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <input name="role" placeholder="Role (e.g. admin, logistics, commander)" onChange={handleChange} required /><br />
        <input name="base_id" placeholder="Base ID" onChange={handleChange} required /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
