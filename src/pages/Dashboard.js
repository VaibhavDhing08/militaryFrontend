import React, { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [baseId, setBaseId] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [type, setType] = useState('');

  const fetchDashboardStats = async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/assets/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          base_id: baseId,
          ...filters
        }
      });

      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const handleApplyFilters = () => {
    fetchDashboardStats({
      from_date: fromDate,
      to_date: toDate,
      type
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Military Asset Management Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>From: </label>
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />

        <label style={{ marginLeft: '10px' }}>To: </label>
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />

        <label style={{ marginLeft: '10px' }}>Equipment Type: </label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All</option>
          <option value="Weapon">Weapon</option>
          <option value="Vehicle">Vehicle</option>
        </select>

        <button onClick={handleApplyFilters} style={{ marginLeft: '10px' }}>
          Apply Filters
        </button>
      </div>

      {stats ? (
        <div>
          <h2>Base {baseId} Summary</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Opening Balance</th>
                <th>Transfers In</th>
                <th>Transfers Out</th>
                <th>Purchases</th>
                <th>Net Movement</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.opening_balance}</td>
                <td>{stats.transfer_in}</td>
                <td>{stats.transfer_out}</td>
                <td>{stats.purchases}</td>
                <td>{stats.net_movement}</td>
                <td>{stats.closing_balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading dashboard stats...</p>
      )}
    </div>
  );
}

export default Dashboard;
