const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

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
require('./routes/index')(app, passport)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

module.exports = { app }
