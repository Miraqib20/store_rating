import React, { useEffect, useState } from 'react';
import API from '../api';

export default function OwnerDashboard({ onLogout }){
  const [myStores,setMyStores]=useState([]);
  useEffect(async ()=>{
    // simplistic: owner can view all stores and filter by owner if available
    const res = await API.get('/stores'); setMyStores(res.data);
  },[]);
  return (<div>
    <h2>Store Owner Dashboard</h2>
    <button onClick={onLogout}>Logout</button>
    <h3>Your Stores (basic)</h3>
    <ul>{myStores.map(s=> <li key={s.id}>{s.name} — Avg: {s.averageRating}</li>)}</ul>
  </div>);
}
