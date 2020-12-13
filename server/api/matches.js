const router = require('express').Router()
const {User, Artist, Song, Match} = require('../db/models')
module.exports = router

//GET /api/matches
router.get('/', async (req, res, next) => {
  try {
    const currentUser = req.user

    const myMatches = await currentUser.getMatchedUser()

    const matchedMe = await User.findAll({
      include: {
        model: User,
        as: 'matchedUser',
        where: {
          id: currentUser.id
        }
      }
    })

    const matchData = {
      myMatches: myMatches,
      matchedMe: matchedMe
    }

    res.json(matchData)
  } catch (err) {
    next(err)
  }
})

// POST /api/matches
router.post('/', async (req, res, next) => {
  try {
    const currentUser = req.user
    const match = await User.findOne({
      where: {
        spotifyId: req.body.matchName
      }
    })
    let [matchEntry] = await currentUser.getMatchedUser({
      where: {
        id: match.id
      }
    })
    if (!matchEntry) {
      matchEntry = await currentUser.addMatchedUser(match)
    }
    res.json(matchEntry)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const currentUserId = req.user.id
    const matchId = req.params.id

    let matchEntry = await Match.findOne({
      where: {
        userId: matchId,
        matchedUserId: currentUserId
      }
    })
    await matchEntry.update({
      approved: true
    })
    res.json(matchEntry)
  } catch (err) {
    next(err)
  }
})

// delete
router.delete('/:id', async (req, res, next) => {
  try {
    const currentUser = req.user
    const match = await User.findOne({
      where: {
        id: req.params.id
      }
    })

    let matchEntry = await Match.findOne({
      where: {
        userId: req.params.id,
        matchedUserId: req.user.id
      }
    })

    if (matchEntry) {
      await match.removeMatchedUser(currentUser)
    } else {
      await currentUser.removeMatchedUser(match)
    }

    res.sendStatus(204)
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
