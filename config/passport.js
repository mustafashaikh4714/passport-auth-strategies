import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import User from '../models/user'
module.exports = passport => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SECRET_KEY
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          // console.log("user from pass conf", user);
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )
}
