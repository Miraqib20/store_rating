import React, { useEffect, useState } from 'react';
import API from '../api';
export default function OwnerDashboard(){
  const [data,setData]=useState([]); const [msg,setMsg]=useState('');
  useEffect(()=>{ load(); },[]);
  async function load(){
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/owner/dashboard', { headers: { Authorization: 'Bearer '+token }});
      setData(res.data);
    } catch(err){ setMsg('Error or unauthorized'); }
  }
  return (<div>
    <h2>Owner Dashboard</h2>
    <div>{msg}</div>
    <ul>
      {data.map(d=>(
        <li key={d.store.id}>
          <strong>{d.store.name}</strong> — Avg: {d.avg_rating}
          <ul>
            {d.raters.map(r=> <li key={r.id}>{r.user_id} — {r.rating}</li>)}
          </ul>
        </li>
      ))}
    </ul>
  </div>);
}
