const apiRouter = require('express').Router()

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!'
  })
})

// place your routers here

module.exports = apiRouter
