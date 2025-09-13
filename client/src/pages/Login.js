import React, { useState } from 'react';
import API from '../api';

export default function Login({ onLogin }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  async function submit(e){
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password });
    onLogin(res.data);
  }
  return (<form onSubmit={submit}>
    <div><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/></div>
    <div><input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/></div>
    <button type='submit'>Login</button>
  </form>);
}
