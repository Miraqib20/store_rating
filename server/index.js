console.log('DB_USER:', process.env.DB_USER, 'DB_PASS:', process.env.DB_PASS);

require('dotenv').config(); // must be at the top

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/stores');
const ownerRoutes = require('./routes/owner');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/owner', ownerRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // Test DB connection first
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');

    // Sync models
    await sequelize.sync();
    console.log('✅ Models synced successfully!');

    // Start server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Unable to start server:', err.message);
    process.exit(1);
  }
}

start();
