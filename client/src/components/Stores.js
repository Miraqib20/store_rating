import React, { useEffect, useState } from 'react';
import API from '../api';
export default function Stores(){
  const [stores,setStores]=useState([]); const [msg,setMsg]=useState('');
  useEffect(()=>{ load(); },[]);
  async function load(){ try { const res = await API.get('/stores'); setStores(res.data); } catch(err){ setMsg('Error loading'); } }
  async function rate(storeId, value){
    try {
      const token = localStorage.getItem('token');
      await API.post('/stores/'+storeId+'/rating',{ rating: value }, { headers: { Authorization: 'Bearer '+token }});
      setMsg('Rating saved'); load();
    } catch(err){ setMsg('Error saving rating'); }
  }
  return (<div>
    <h2>Stores</h2>
    <div>{msg}</div>
    <ul>
      {stores.map(s=>(
        <li key={s.store.id}>
          <strong>{s.store.name}</strong> — {s.store.address} — Avg: {s.overall_rating} — Your: {s.user_rating || 'N/A'}
          <div>
            {[1,2,3,4,5].map(n=> <button key={n} onClick={()=>rate(s.store.id,n)}>{n}</button>)}
          </div>
        </li>
      ))}
    </ul>
  </div>);
}
