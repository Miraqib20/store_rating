import React, { useState } from 'react';
import { api } from '../api';

function RatingForm({ storeId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submitRating = async () => {
    try {
      await api.post('/ratings', { store_id: storeId, rating, comment });
      alert('Rating submitted!');
      setComment('');
      setRating(5);
    } catch (err) {
      alert('Error submitting rating');
    }
  };

  return (
    <div>
      <input type="number" min="1" max="5" value={rating} onChange={e=>setRating(e.target.value)} />
      <input type="text" placeholder="Comment" value={comment} onChange={e=>setComment(e.target.value)} />
      <button onClick={submitRating}>Submit Rating</button>
    </div>
  );
}

export default RatingForm;
