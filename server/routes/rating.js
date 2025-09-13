const express = require('express');
const router = express.Router();
const { Rating } = require('../models');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Get all ratings (admin only)
router.get('/', authMiddleware, requireRole('ADMIN'), async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
