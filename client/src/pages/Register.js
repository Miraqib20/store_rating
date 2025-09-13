import React, { useState } from 'react';
import API from '../api';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState('');
  const [address,setAddress]=useState(''); const [password,setPassword]=useState('');
  async function submit(e){
    e.preventDefault();
    await API.post('/auth/register', { name,email,address,password });
    alert('Registered — now login');
  }
  return (<form onSubmit={submit}>
    <div><input placeholder='Full name (20-60 chars)' value={name} onChange={e=>setName(e.target.value)}/></div>
    <div><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/></div>
    <div><textarea placeholder='Address' value={address} onChange={e=>setAddress(e.target.value)}/></div>
    <div><input type='password' placeholder='Password (8-16)' value={password} onChange={e=>setPassword(e.target.value)}/></div>
    <button type='submit'>Sign up</button>
  </form>);
}
