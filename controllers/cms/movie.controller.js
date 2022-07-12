const { Movie } = require('../../models')

class MovieController {
  static async create(req, res, next) {
    try {
      if (req.file) {
        req.body.poster = `http://localhost:3000/${req.file.filename}`
      }
      await Movie.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        poster: req.body.poster
      })
      res.status(200).json({
        message: 'Successfully create movie'
      })
    } catch(err) {
      next(err)
    }
  }

  static async list(req, res, next) {
    try {
      const movies = await Movie.findAll()

      res.status(200).json(movies)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = MovieController