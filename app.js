const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')

const PORT = process.env.PORT || 3000
const app = express()

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// SESSION MIDDLEWARE
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

require('./config/database')
require('./routes/index')(app)
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

module.exports = { app }
