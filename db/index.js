const client = require('./client')
const { createUser } = require('./models/user.js')
// user model imports between {} above


module.exports = {
  client,
  createUser,
  // user model imports here
  ...require('./models/user'), // adds key/values from user.js
  ...require('./models/cat') // adds key/values from cat.js
}
// module.exports = {
//   // ...require('./client'), // adds key/values from users.js
//   ...require('./models/user'), // adds key/values from user.js
//   ...require('./models/cat') // adds key/values from cat.js

// }
