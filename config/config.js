let express = require('express'),
  routes = require('../routes')

// custom logegr Middleware function 
const logger = (req, res, next ) => {
  console.log(
    `${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl} - ${Date()}`
  )
  next()
}  

module.exports = (app) => {
  app.use(logger)   // pass the custom middleware function and apply it to all requests
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  routes.accounts(app)
  return app
}

