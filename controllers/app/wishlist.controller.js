const { Wishlist, Movie } = require('../../models')

class WishlistController {

  static async add(req, res, next) {
    try {
      console.log(req.user)
      const movie = await Movie.findOne({
        where: {
          id: req.body.movieId
        }
      })
      if (!movie) {
        throw {
          status: 404,
          message: 'Movie not found'
        }
      } else {
        const wishlist = await Wishlist.findOne({
          where: {
            movieId: req.body.movieId,
            userId: req.user.id
          }
        })

        if (wishlist) {
          throw {
            status: 400,
            message: 'Movie already added to the wishlist'
          }
        } else {
          await Wishlist.create({
            movieId: req.body.movieId,
            userId: req.user.id
          })
          res.status(200).json({
            message: 'Successfully add to wishlist'
          })
        }
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = WishlistController