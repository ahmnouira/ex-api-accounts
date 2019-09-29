
let Accounts = require('../api/accounts'),
 uuidv4 = require('uuid/v4')      //  to generate a random id for new account

module.exports = {
  get : (req, res) => {
      if(req.params.id) {
          // array.some: test whatever at least one element in the array passes the test condition
          const found = Accounts.some(account => account.id == req.params.id)
          if (found) {
            // array.filter: returns the element of the array that meets the test condition
            const account = Accounts.filter(account => account.id == req.params.id)
            res.json(account)       
          } else {
            res.status(400).json({mg: `No account with the id of ${req.params.id}`})
          }   
        } else {
          res.json(Accounts)
        }
},

post : (req, res) => {
  let newAccount = {
    id : uuidv4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active' // keep active account for new Accounts
  }

  if(!newAccount.name || !newAccount.email) {
    return res.status(400).json({msg: 'Please include a name and email'})
  }
  Accounts.push(newAccount);
  res.json(Accounts);
},


put : (req, res) => {
  const found = Accounts.some(account => account.id == req.params.id)
  if (found) {
    let updAccount = req.body
    Accounts.forEach((account) => {
      if(account.id === req.params.id){
        account.name = updAccount.name ? updAccount.name : account.name
        account.email = updAccount.email ? updAccount.email : account.email
        res.json({msg: 'Account Updated', account})
      }
    })
  } else {
    res.status(200).json({msg: `No Account with the id of ${req.params.id}`})
  }
},

delete : (req, res) => {
  if(req.params.id) {
  const found = Accounts.some(account => account.id == req.params.id)
  if (found) {
    const index = Accounts.findIndex(account => account.id == req.params.id)
    Accounts.splice(index, 1) // remove the element starting from index 
    res.json(Accounts) 
  } else {
    res.status(400).json({msg: `No Account with the id of ${req.params.id}`})
  }
} else {
    Accounts = [];
    res.json(Accounts);
}

}
}
