const express = require('express')
const router = express.Router()
const MovieController = require('../../controllers/cms/movie.controller')
const { authenticateAdmin } = require('../../helpers/middlewares.helper')
const multer = require('multer')
const storage = require('../../helpers/multerstorage.herlper')
const upload = multer({
  storage,
  limits: {
    fileSize: 3000000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jepg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
    } else {
      cb({
        status: 400,
        message: 'File type does not match'
      }, false)
    }
  }
})

router.post('/', 
// autentikasi
upload.single('poster'),
// (req, res, next) => {
//   console.log('masuk')
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//         err.status = 400
//         err.message = err
//         next(err)
//     } else if (err) {
//       next(err)
//         // An unknown error occurred when uploading.
//     }
//     // Everything went fine. 
//     next()
// })
// },
authenticateAdmin,
MovieController.create)

router.get('/', 
// autentikasi
authenticateAdmin,
MovieController.list)

module.exports = router