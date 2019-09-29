let accounts = require('../controllers/accounts')

module.exports = (app) => {
  app.get(['/api/accounts/', '/api/accounts/:id/'], accounts.get) // GET all & by ID
  app.post('/api/accounts/', accounts.post)
  app.put('/api/accounts/:id/', accounts.put)
  app.delete(['/api/accounts/', '/api/accounts/:id'], accounts.delete) // DELETE all & by ID
}