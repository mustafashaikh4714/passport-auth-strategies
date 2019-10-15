import mongoose, { Schema } from 'mongoose'
const CommentSchema = new Schema({
  comment: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})
const Comment = mongoose.model('comment', CommentSchema, 'comments')
export default Comment
