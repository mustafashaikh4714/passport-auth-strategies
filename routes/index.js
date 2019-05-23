const bcrypt = require('bcryptjs')
const User = require('../models/user')
const isAuthenticated = require('../config/auth')
const passport = require('passport')

module.exports = app => {
  app.get('/', (req, res) => {
    console.log('Welcome to the App!')
  })

  app.get('/register', (req, res) => {
    res.render('/register')
  })

  app.post('/register', (req, res) => {
    // register new user here.
    // redirect to login after register successfully in order to manage session of individual user.
  })

  app.get('/login', (req, res) => {
    res.render('/login')
  })

  app.post('/login', (req, res) => {
    // login user.
  })

  // protected route
  app.get('/edit/user/:id', isAuthenticated, (req, res) => {
    User.findOne({ _id: req.params.id }).then(data => {
      if (data.user != req.user.id) {
        res.status(400).send('Not Authorized')
        res.render('/user')
      } else res.render('/edit/user', data)
    })
  })

  app.put('/edit/user/:id', isAuthenticated, (req, res) => {
    // update user
    // send response.
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })
}
