const bcrypt = require('bcrypt');
const { User, sequelize } = require('./models');

async function createOrUpdateAdmin() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const email = 'admin@example.com';
    const password = 'Aqib@123';
    const hash = await bcrypt.hash(password, 12);

    let admin = await User.findOne({ where: { email } });

    if (admin) {
      // Update password and role if admin exists
      await admin.update({ password: hash, role: 'ADMIN' });
      console.log('Admin updated with new password');
    } else {
      // Create new admin
      admin = await User.create({
        name: 'System Admin',
        email,
        password: hash,
        role: 'ADMIN'
      });
      console.log('Admin created:', admin.email);
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createOrUpdateAdmin();
