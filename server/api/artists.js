const router = require('express').Router()
const {Artist, User} = require('../db/models')
module.exports = router

//GET /api/artists
router.get('/', async (req, res, next) => {
  try {
    const topArtists = await Artist.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.user.id
          }
        }
      ]
    })
    res.json(topArtists)
  } catch (err) {
    next(err)
  }
})
