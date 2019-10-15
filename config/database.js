import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.DATABASE_URL, err => {
  if (!err) {
    return console.log('Database Connected!')
  }
})

module.exports = { mongoose }
