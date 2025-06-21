import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetExpenditure() {
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expendedDate, setExpendedDate] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        asset_id: parseInt(assetId),
        quantity: parseInt(quantity),
        expended_date: expendedDate,
      };

      await axios.post('http://localhost:5000/api/assets/expend', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      alert('Asset expenditure recorded successfully!');
      setAssetId('');
      setQuantity('');
      setExpendedDate('');
    } catch (error) {
      console.error('Error recording expenditure:', error);
      alert('Error recording expenditure');
    }
  };

  return (
    <div>
      <h2>Expend Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>Asset:</label>
        <select value={assetId} onChange={e => setAssetId(e.target.value)} required>
          <option value="">Select Asset</option>
          {assets.map(a => (
            <option key={a.asset_id} value={a.asset_id}>
              {a.asset_name} (ID: {a.asset_id})
            </option>
          ))}
        </select><br/>

        <label>Quantity Expended:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /><br/>

        <label>Expenditure Date:</label>
        <input type="date" value={expendedDate} onChange={(e) => setExpendedDate(e.target.value)} required /><br/>

        <button type="submit">Submit Expenditure</button>
      </form>
    </div>
  );
}

export default AssetExpenditure;
