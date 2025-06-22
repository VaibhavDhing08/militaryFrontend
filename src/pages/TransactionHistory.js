import React, { useEffect, useState } from 'react';
import api from '../api';

function TransactionHistory() {
  const [purchases, setPurchases] = useState([]);
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchPurchases = async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/assets/purchases', {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters }
      });

      setPurchases(response.data);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleApplyFilters = () => {
    fetchPurchases({
      type,
      startDate,
      endDate
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Purchase History</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Type: </label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All</option>
          <option value="Weapon">Weapon</option>
          <option value="Vehicle">Vehicle</option>
        </select>

        <label style={{ marginLeft: '10px' }}>From: </label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />

        <label style={{ marginLeft: '10px' }}>To: </label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />

        <button onClick={handleApplyFilters} style={{ marginLeft: '10px' }}>Apply Filters</button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Purchase ID</th>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Purchased On</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p, index) => (
            <tr key={index}>
              <td>{p.asset_id}</td>
              <td>{p.asset_name}</td>
              <td>{p.type}</td>
              <td>{p.quantity}</td>
              <td>{p.purchased_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
