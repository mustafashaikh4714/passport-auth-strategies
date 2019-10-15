// import jwt from 'jwt-simple'
// export default user => jwt.encode(user, process.env.SECRET_KEY.trim())
import jwt from 'jsonwebtoken'
export default user => jwt.sign(user, process.env.SECRET_KEY.trim())
