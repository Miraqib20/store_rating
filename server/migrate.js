// helper to create sample data
const { sequelize, User, Store } = require('./models');
const bcrypt = require('bcrypt');
async function seed() {
  await sequelize.sync({ force: true });
  const hash = await bcrypt.hash('AdminPass!1', 12);
  const admin = await User.create({ name: 'System Administrator Sample Name', email: 'admin@example.com', password_hash: hash, address: 'Admin Address', role: 'system_admin' });
  const uhash = await bcrypt.hash('UserPass!1', 12);
  const user = await User.create({ name: 'Normal User Sample Name Longer', email: 'user1@example.com', password_hash: uhash, address: 'User Address', role: 'normal_user' });
  const ohash = await bcrypt.hash('OwnerPass!1', 12);
  const owner = await User.create({ name: 'Store Owner Sample Name Longer', email: 'owner1@example.com', password_hash: ohash, address: 'Owner Address', role: 'store_owner' });
  await Store.create({ name: 'Sample Store 1', email: 'store1@example.com', address: 'Shop Street 1', owner_id: owner.id });
  await Store.create({ name: 'Sample Store 2', email: 'store2@example.com', address: 'Shop Street 2', owner_id: owner.id });
  console.log('Seeded');
  process.exit(0);
}
seed();
