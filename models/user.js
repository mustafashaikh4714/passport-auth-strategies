import mongoose, { Schema } from 'mongoose'
const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogpost'
    }
  ]
})

const User = mongoose.model('user', UserSchema)
export default User
