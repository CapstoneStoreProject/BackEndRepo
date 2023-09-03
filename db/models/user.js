// grab our db client connection to use with our adapters
// const client = require('../client')

// async function getAllUsers() {
//   /* this adapter should fetch a list of users from your db */
//   console.log('hello')
// }

// module.exports = {
//   // add your database adapter fns here
//   getAllUsers
// }
const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// user functions
async function createUser({ name, username, password}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users(name, username, password)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [name, username, hashedPassword]);
    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser
  
}