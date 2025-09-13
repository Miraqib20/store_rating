import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AdminDashboard({ onLogout }){
  const [counts,setCounts]=useState({});
  const [stores,setStores]=useState([]);
  const [users,setUsers]=useState([]);
  useEffect(()=>{ API.get('/admin/dashboard').then(r=>setCounts(r.data)); API.get('/admin/stores').then(r=>setStores(r.data)); API.get('/admin/users').then(r=>setUsers(r.data)); },[]);
  return (<div>
    <h2>Admin Dashboard</h2>
    <button onClick={onLogout}>Logout</button>
    <div>
      <p>Total users: {counts.users}</p>
      <p>Total stores: {counts.stores}</p>
      <p>Total ratings: {counts.ratings}</p>
    </div>
    <h3>Stores</h3>
    <ul>{stores.map(s=> <li key={s.store.id}>{s.store.name} — {s.store.address} — Avg: {s.averageRating}</li>)}</ul>
    <h3>Users</h3>
    <ul>{users.map(u=> <li key={u.id}>{u.name} — {u.email} — {u.role}</li>)}</ul>
  </div>);
}
