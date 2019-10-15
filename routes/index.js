import bcrypt from 'bcryptjs'
import BlogPost from '../models/blogPost'
import Comment from '../models/comment'
import User from '../models/user'
import genToken from '../utils/genToken'
import getHash from '../utils/getHash'

export default (app, passport) => {
  // REGISTER
  app.post('/create/user', async (req, res) => {
    let { name, email, password } = req.body
    try {
      let hashPassword = await getHash(password)
      await new User({ name, email, password: hashPassword }).save()
      res.send({ message: 'User registered' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  app.post(
    '/create/post',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { title, content } = req.body
      const { email } = req.user
      const user = await User.findOne({ email })
      let newPost = new BlogPost({ title, content })
      user.blogPosts.push(newPost)

      Promise.all([user.save(), newPost.save()]).then(() => {
        res.send({ message: `New post created by ${email}` })
      })
    }
  )

  app.post(
    '/add/comment',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { email } = req.user
      const { comment, postId } = req.body
      const user = await User.findOne({ email })
      const post = await BlogPost.findOne({ _id: postId })
      const newComment = new Comment({ comment })
      newComment.user = user
      post.comments.push(newComment)

      Promise.all([newComment.save(), post.save()]).then(() => {
        res.send({ message: `${user.email} comment to the post ${post.title}` })
      })
    }
  )

  //  const { title, comment } = req.body
  // const { email } = req.user
  // const user = await User.findOne({ email })
  // let newPost = new BlogPost({ title })
  // let newComment = new Comment({ comment })
  // user.blogPosts.push(newPost)
  // newPost.comments.push(newComment)
  // newComment.user.push(user)

  // Promise.all([user.save(), newPost.save(), newComment.save()]).then(() => {
  //   res.send()
  // })
  // PROTECTED ROUTE
  app.get(
    '/user/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.send(req.user)
    }
  )
  app.post('/update', async (req, res) => {
    const { name, email, logo, id } = req.body
    const user = await User.findById(id)

    const getUserData = () => {
      if (user.name !== name) {
        if (user.email !== email) {
          if (user.logo !== logo) {
            return {
              name,
              email,
              logo
            }
          } else return { name, email }
        } else if (user.logo !== logo) {
          return { name, logo }
        } else return { name }
      } else if (user.email !== email) {
        if (user.logo !== logo) {
          return { email, logo }
        } else return { email }
      } else return { logo }
    }
    await User.findOneAndUpdate(id, {
      $set: { ...getUserData() }
    })
  })

  //LOGIN
  app.post('/user/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ message: 'User not found' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).send({ message: "Password doesn't match" })

    const data = { id: user._id, email: user.email }
    return res.send({
      message: 'Login Successfully',
      token: genToken(data)
    })
  })
}
