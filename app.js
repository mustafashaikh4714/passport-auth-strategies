import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'
import routes from './routes/index'

const PORT = process.env.PORT || 3000
const app = express()

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// PASSPORT MIDDLEWARE
app.use(passport.initialize())

require('./config/database')
require('./config/passport')(passport)
routes(app, passport)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

// module.exports = { app }
