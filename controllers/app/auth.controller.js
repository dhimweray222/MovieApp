const { User, Admin } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
const axios = require('axios')

class AuthController {
  static async register(req, res, next) {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)

      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      const admin = await Admin.findOne({
        where: {
          email: req.body.email
        }
      })

      if (user || admin) {
        throw {
          status: 400,
          message: 'Email already used'
        }
      }

      await User.create({
        email: req.body.email,
        password: hash
      })
      const html = `
        <pre>
        <H1>Welcome To Movie App</H1>
        <pre>
        `
        await sendEmail('dhimweray222@gmail.com', req.body.email, html, null, req.body.email)
        res.status(200).json({
          message: 'Succesfully send email'
        })

      res.status(200).json({
        message: 'Successfully create user'
      })
    } catch (err) {
      next(err)
    }
  }

  static async loginPassword(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!user) {
        throw {
          status: 401,
          message: 'Invalid username or password'
        }
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.JWT_SECRET)

          res.status(200).json({
            token,
          })
        } else {
          throw {
            status: 401,
            message: 'Invalid username or password'
          }
        }
      }
    } catch(err) {
      next(err)
    }
  }

  static async google(req, res, next) {
    try {
      const token = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_IDs
      })
      const payload = token.getPayload()

      const admin = await Admin.findOne({
        where: {
          email: payload.email
        }
      })

      if (admin) {
        throw {
          status: 400,
          message: 'Invalid email'
        }
      }
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      })
      if (user) {
        const jwtToken = jwt.sign({
          id: user.id,
          email: user.email
        }, process.env.JWT_SECRET)
        res.status(200).json({
          token: jwtToken
        })
      } else {
        const registeredUser = await User.create({
          email: payload.email
        })
        const jwtToken = jwt.sign({
          id: registeredUser.id,
          email: registeredUser.email
        }, process.env.JWT_SECRET)
        res.status(200).json({
          token: jwtToken
        })
      }
    } catch(err) {
      next(err)
    }
  }

  static async facebook(req, res, next) {
    try {
      const response = await axios.get(`https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Cemail%2Cgender%2Cbirthday&access_token=${req.body.token}`)
      const admin = await Admin.findOne({
        where: {
          email: response.data.email
        }
      })

      if (admin) {
        throw {
          status: 400,
          message: 'Invalid email'
        }
      }
      const user = await User.findOne({
        where: {
          email: response.data.email
        }
      })
      if (user) {
        const jwtToken = jwt.sign({
          id: user.id,
          email: user.email
        }, process.env.JWT_SECRET)
        res.status(200).json({
          token: jwtToken
        })
      } else {
        const registeredUser = await User.create({
          email: response.data.email
        })
        const jwtToken = jwt.sign({
          id: registeredUser.id,
          email: registeredUser.email
        }, process.env.JWT_SECRET)
        res.status(200).json({
          token: jwtToken
        })
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = AuthController