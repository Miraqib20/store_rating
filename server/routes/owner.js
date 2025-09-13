const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const { Store, Rating, sequelize } = require('../models');

// Owner dashboard: list raters for owner's stores
router.get('/dashboard', authMiddleware, requireRole('store_owner'), async (req, res) => {
  // find stores owned by user
  const stores = await Store.findAll({ where: { owner_id: req.user.id }});
  const results = await Promise.all(stores.map(async s => {
    const ratings = await Rating.findAll({ where: { store_id: s.id }, include: ['User'] });
    const avg = await Rating.findAll({ where: { store_id: s.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg_rating']] });
    return { store: s, raters: ratings, avg_rating: parseFloat(avg[0]?.dataValues?.avg_rating) || 0 };
  }));
  res.json(results);
});

module.exports = router;
