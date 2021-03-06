const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      (email, password, done) => {
        User.findOne({ email }).then(user => {
          if (!user) return done(null, false, { message: 'No user found.' })
          // MATCH PASSWORD
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) return done(null, user)
            else return done(null, false, { message: 'Password incorrect.' })
          })
        })
      }
    )
  )
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}
