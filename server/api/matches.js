const router = require('express').Router()
const {User, Artist, Song} = require('../db/models')
module.exports = router

//GET /api/matches
router.get('/', async (req, res, next) => {
  try {
    const currentUser = req.user
    const matches = await currentUser.getMatches()
    res.json(matches)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const currentUser = req.user
    const match = await User.findOne({
      where: {
        spotifyId: req.body.matchName
      }
    })
    let [matchEntry] = await currentUser.getMatches({
      where: {
        id: match.id
      }
    })
    if (!matchEntry) {
      matchEntry = await currentUser.addMatch(match)
    }
    res.json(matchEntry)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/artists', async (req, res, next) => {
  try {
    const currentUserId = req.user.id
    const matchId = req.params.id
    const sharedArtists = await Artist.findAll({
      include: [
        {
          model: User,
          where: {
            id: currentUserId
          },
          required: true
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: matchId
          },
          required: true
        }
      ]
    })
    res.json(sharedArtists)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/songs', async (req, res, next) => {
  try {
    const currentUserId = req.user.id
    const matchId = req.params.id
    const sharedSongs = await Song.findAll({
      include: [
        {
          model: User,
          where: {
            id: currentUserId
          },
          required: true
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: matchId
          },
          required: true
        }
      ]
    })
    res.json(sharedSongs)
  } catch (err) {
    next(err)
  }
})
