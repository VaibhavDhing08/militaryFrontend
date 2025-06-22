import React, { useState, useEffect } from 'react';
import api from '../api';

function AssetTransfer() {
  const [assets, setAssets] = useState([]);
  const [transferData, setTransferData] = useState({
    asset_id: '',
    from_base_id: '',
    to_base_id: '',
    quantity: '',
    transfer_date: ''
  });

  useEffect(() => {
    const fetchAssets = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/assets/assets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssets(res.data);
    };
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assets/transfer', transferData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Asset transferred successfully!');
      setTransferData({ asset_id: '', from_base_id: '', to_base_id: '', quantity: '', transfer_date: '' });
    } catch (err) {
      console.error(err);
      alert('Error transferring asset');
    }
  };

  return (
    <div>
      <h2>Transfer Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>Asset:</label>
        <select name="asset_id" value={transferData.asset_id} onChange={handleChange} required>
          <option value="">Select Asset</option>
          {assets.map(a => (
            <option key={a.asset_id} value={a.asset_id}>
              {a.asset_name} (ID: {a.asset_id})
            </option>
          ))}
        </select><br/>

        <input type="number" name="from_base_id" placeholder="From Base ID" value={transferData.from_base_id} onChange={handleChange} required /><br/>
        <input type="number" name="to_base_id" placeholder="To Base ID" value={transferData.to_base_id} onChange={handleChange} required /><br/>
        <input type="number" name="quantity" placeholder="Quantity" value={transferData.quantity} onChange={handleChange} required /><br/>
        <input type="date" name="transfer_date" value={transferData.transfer_date} onChange={handleChange} required /><br/>
        <button type="submit">Transfer Asset</button>
      </form>
    </div>
  );
}

export default AssetTransfer;
