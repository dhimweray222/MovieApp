const { Admin } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

class AuthController {
  static async login(req, res, next) {
    try {
      const admin = await Admin.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!admin) {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      } else {
        if (bcrypt.compareSync(req.body.password, admin.password)) {
          const token = jwt.sign({
            id: admin.id,
            email: admin.email,
            role_id: admin.roleId
          }, process.env.JWT_SECRET)

          res.status(200).json({ token })
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        }
      }
    } catch(err) {
      next(err)
    }
  }

}

module.exports = AuthController