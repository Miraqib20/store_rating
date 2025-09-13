import React, { useEffect, useState } from 'react';
import { api } from '../api';

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({ totalUsers:0, totalStores:0, totalRatings:0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setDashboard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {dashboard.totalUsers}</p>
      <p>Total Stores: {dashboard.totalStores}</p>
      <p>Total Ratings: {dashboard.totalRatings}</p>
    </div>
  );
}

export default AdminDashboard;
