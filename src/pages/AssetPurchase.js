import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetPurchase() {
  const [assetData, setAssetData] = useState({
    asset_name: '', type: '', base_id: '', quantity: '', purchased_on: ''
  });
  const [filters, setFilters] = useState({ type: '', startDate: '', endDate: '' });
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const handleChange = (e) => {
    setAssetData({ ...assetData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/assets/purchase', assetData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Asset purchased successfully!');
      setAssetData({ asset_name: '', type: '', base_id: '', quantity: '', purchased_on: '' });
      fetchPurchaseHistory();
    } catch (err) {
      console.error(err);
      alert('Error purchasing asset');
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      const token = localStorage.getItem('token');

      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const res = await axios.get('http://localhost:5000/api/assets/purchases', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      setPurchaseHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPurchaseHistory(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Purchase New Asset</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="asset_name" placeholder="Asset Name" value={assetData.asset_name} onChange={handleChange} required /><br />
        <input type="text" name="type" placeholder="Type" value={assetData.type} onChange={handleChange} required /><br />
        <input type="number" name="base_id" placeholder="Base ID" value={assetData.base_id} onChange={handleChange} required /><br />
        <input type="number" name="quantity" placeholder="Quantity" value={assetData.quantity} onChange={handleChange} required /><br />
        <input type="date" name="purchased_on" value={assetData.purchased_on} onChange={handleChange} required /><br />
        <button type="submit">Purchase Asset</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Purchase History Filters</h3>
      <input type="text" name="type" placeholder="Equipment Type" value={filters.type} onChange={handleFilterChange} />
      <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
      <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
      <button onClick={fetchPurchaseHistory}>Apply Filters</button>

      <h3 style={{ marginTop: '30px' }}>Purchase History</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Asset Name</th><th>Type</th><th>Base ID</th><th>Quantity</th><th>Purchased On</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.asset_id}</td>
              <td>{purchase.asset_name}</td>
              <td>{purchase.type}</td>
              <td>{purchase.base_id}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.purchased_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetPurchase;
