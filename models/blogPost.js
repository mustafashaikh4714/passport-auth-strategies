import mongoose, { Schema } from 'mongoose'
const BlogPostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
})
const BlogPost = mongoose.model('blogpost', BlogPostSchema, 'blogposts')
export default BlogPost
