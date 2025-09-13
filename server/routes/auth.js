const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize model
require('dotenv').config();

const passwordRegex = /^.{6,}$/; // min 6 chars
const nameRegex = /^.{3,60}$/;   // 3–60 chars

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing fields' });
    if (!nameRegex.test(name))
      return res.status(400).json({ message: 'Name must be 3–60 chars' });
    if (address && address.length > 400)
      return res.status(400).json({ message: 'Address too long' });
    if (!passwordRegex.test(password))
      return res.status(400).json({ message: 'Password must be at least 6 chars' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already used' });

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hash,  // Correct column
      address,
      role: 'USER'
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password using correct column
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
