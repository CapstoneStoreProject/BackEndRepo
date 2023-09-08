const client = require('./client')
// const { createUser } = require('./models/user.js')
// user model imports between {} above


// module.exports = {
//   client,
//   createUser
//   // user model imports here
// }
module.exports = {
  // ...require('./client'), // adds key/values from users.js
  ...require('./user'), // adds key/values from user.js
  ...require('./cat') // adds key/values from cat.js

}
