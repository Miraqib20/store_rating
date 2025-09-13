const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Restrict routes by role
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role)
      return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};

module.exports = { authMiddleware, requireRole };
