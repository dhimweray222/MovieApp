const { Admin, User } = require('../../models')
const bcrypt = require('bcryptjs')

class AdminController {
  static async create(req, res, next) {
    try {
      const admin = await Admin.findOne({
        where: {
          email: req.body.email
        }
      })
  
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
  
      if (user || admin) {
        throw {
          status: 400,
          message: 'Email already used'
        }
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        await Admin.create({
          email: req.body.email,
          password: hash,
          roleId: req.body.roleId
        })
        res.status(200).json({
          message: 'Successfully create admin'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminController