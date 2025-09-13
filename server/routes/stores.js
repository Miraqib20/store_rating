const express = require('express');
const router = express.Router();
const { Store, Rating, sequelize, Op } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// List stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.findAll({ order: [['name', 'ASC']] });
    const results = await Promise.all(stores.map(async s => {
      const avg = await Rating.findOne({ 
        where: { store_id: s.id }, 
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg_rating']], 
        raw: true 
      });
      return { store: s, avg_rating: parseFloat(avg.avg_rating) || 0 };
    }));
    res.json(results);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Submit or update rating
router.post('/:storeId/rating', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Rating must be 1–5' });

    await Rating.upsert({ user_id: userId, store_id: storeId, rating, comment });

    const stats = await Rating.findOne({
      where: { store_id: storeId },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'overall_rating'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_ratings']
      ],
      raw: true
    });

    res.json({ user_rating: rating, overall_rating: parseFloat(stats.overall_rating) || 0, total_ratings: parseInt(stats.total_ratings) || 0 });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
