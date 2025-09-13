import React, { useEffect, useState } from 'react';
import API from '../api';

export default function UserDashboard({ onLogout }){
  const [stores,setStores]=useState([]);
  const [ratingInputs,setRatingInputs]=useState({});
  useEffect(()=>{ API.get('/stores').then(r=>setStores(r.data)); },[]);
  async function submitRate(id){
    const rating = Number(ratingInputs[id]);
    await API.post('/stores/'+id+'/rate', { rating });
    alert('Rated');
  }
  return (<div>
    <h2>User Dashboard</h2>
    <button onClick={onLogout}>Logout</button>
    <h3>Stores</h3>
    <ul>{stores.map(s=>(
      <li key={s.id}>
        <b>{s.name}</b> — {s.address} — Avg: {s.averageRating || 'N/A'}
        <div>
          <input type='number' min='1' max='5' value={ratingInputs[s.id]||''}
            onChange={e=>setRatingInputs({...ratingInputs,[s.id]:e.target.value})}/>
          <button onClick={()=>submitRate(s.id)}>Submit/Update Rating</button>
        </div>
      </li>
    ))}</ul>
  </div>);
}
