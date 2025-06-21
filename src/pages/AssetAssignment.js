import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetAssignment = () => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    asset_id: '',
    personnel_name: '',
    quantity: '',
    assigned_date: ''
  });

  useEffect(() => {
    const fetchAssets = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assets/assets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssets(res.data);
    };
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/assets/assign', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Asset assigned successfully');
      setFormData({ asset_id: '', personnel_name: '', quantity: '', assigned_date: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to assign asset');
    }
  };

  return (
    <div>
      <h2>Assign Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>Asset:</label>
        <select name="asset_id" value={formData.asset_id} onChange={handleChange} required>
          <option value="">Select Asset</option>
          {assets.map(a => (
            <option key={a.asset_id} value={a.asset_id}>
              {a.asset_name} (ID: {a.asset_id})
            </option>
          ))}
        </select><br/>

        <input type="text" name="personnel_name" placeholder="Personnel Name" value={formData.personnel_name} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="date" name="assigned_date" value={formData.assigned_date} onChange={handleChange} required />
        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default AssetAssignment;
