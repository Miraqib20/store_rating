const bcrypt = require('bcrypt');

async function run() {
  const password = 'Aqib@123';
  const hash = await bcrypt.hash(password, 12);
  console.log(hash);
}

run();
