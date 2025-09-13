import React, { useEffect, useState } from 'react';
import StoreList from './StoreList';
import RatingForm from './RatingForm';
import { api } from '../api';

function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get('/stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <StoreList stores={stores} />
    </div>
  );
}

export default UserDashboard;
