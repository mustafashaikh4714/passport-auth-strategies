const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app, passport) => {
  // REGISTER
  app.post('/user/register', (req, res) => {
    let { name, email, password } = req.body
    let hashPassword = null
    bcrypt.hash(password, 10).then((err, hash) => {
      if (!err) hashPassword = hash
    })
    new User({ name, email, password: hashPassword }).save().then(user => {
      if (!user)
        return res.status(400).send({
          success: false,
          message: ' User not Registered'
        })
      else
        return res.send({
          success: true,
          message: 'User Registered.'
        })
    })
  })

  // PROTECTED ROUTE
  app.post(
    '/user/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json(req.user)
    }
  )

  //LOGIN
  app.post('/user/login', (req, res) => {
    // res.send('user login');
    const { email, password } = req.body

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).send({
            success: false,
            message: "user doesn't exists."
          })
        }
        // compare password
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              logger.error("Password doesn't match")
              return res.status(400).send({
                success: false,
                message: "Password doesn't match"
              })
            } else
              return res.send({
                success: true,
                message: 'Login Successfully'
              })
          })
          .catch(error => console.log(error.message))
      })
      .catch(error => console.log(error.message))
  })
}
