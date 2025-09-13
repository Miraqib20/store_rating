const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const { User, Store, Rating } = require('../models');

router.get('/dashboard', authMiddleware, requireRole('ADMIN'), async (req, res) => {
  try {
    console.log('Admin accessed dashboard, user:', req.user); // DEBUG

    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    const users = await User.findAll({ attributes: ['id','name','email','role'] });

    res.json({
      message: 'Admin dashboard',
      totalUsers,
      totalStores,
      totalRatings,
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
