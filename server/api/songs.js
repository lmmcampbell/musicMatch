const router = require('express').Router()
const {Song, User} = require('../db/models')
module.exports = router

//GET /api/artists
router.get('/', async (req, res, next) => {
  try {
    const topSongs = await Song.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.user.id
          }
        }
      ]
    })
    res.json(topSongs)
  } catch (err) {
    next(err)
  }
})
