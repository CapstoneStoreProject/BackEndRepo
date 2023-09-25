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

async function getAllUsers() {
  try {
      const { rows } = await client.query(`
      SELECT *
      FROM users;
      `);
      return rows;
  } catch (error) {
      throw error;
  }
}

async function getUser({username, password}) {
  if (!username || !password) {
    console.log("1")
    return;
  }
  try {
    const user = await getUserByUsername(username);
    console.log(user, "user")
    if(!user) return(null);
    console.log(user.password)
    const hashedPassword = user.password;
    console.log(hashedPassword)
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserById(userId) {
  // first get the user
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [userId]);
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password; 
    return user;  
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(userName) {
  // first get the user
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [userName]);
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error)
  }
}
// async function verifyUsername(userName) {
//   try {
//       const { rows } = await client.query(`
//       SELECT *
//       FROM users;  
//       WHERE username = $1;
//       `, [userName]);
//       if (!rows) {
//         return true;
//       } else {
//         return false;
//       }
//       // const [userName] = rows;
      
//   } catch (error) {
//       throw error;
//   }
// }
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  // verifyUsername
}