/* eslint-disable complexity */
/* eslint-disable camelcase */
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const axios = require('axios')
const request = require('request')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const {
  User,
  Artist,
  Song,
  FavoriteArtist,
  FavoriteSong
} = require('./db/models')
const socketio = require('socket.io')
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

// spotify items
const client_id = '0be36334572a44b2900205bb22aaf4a8'
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = `${process.env.DOMAIN}/callback`

var generateRandomString = function(length) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var stateKey = 'spotify_auth_state'

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(cors())
  app.use(cookieParser())

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  //login route

  app.get('/login', function(req, res) {
    var state = generateRandomString(16)
    res.cookie(stateKey, state)

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read'
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        })
    )
  })

  app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'state_mismatch'
          })
      )
    } else {
      res.clearCookie(stateKey)
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        json: true
      }

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token

          // pass the token to the browser to make requests from there
          // redirects to front end with these as hash state; re-loads page and has the token on the hash state (so front end grabs params and I should store in my store)
          res.redirect(
            '/home/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              })
          )
        } else {
          res.redirect(
            '/#' +
              querystring.stringify({
                error: 'invalid_token'
              })
          )
        }
      })
    }
  })

  // eslint-disable-next-line max-statements
  app.post('/spotify/me', async (req, res, next) => {
    try {
      // GET CURRENT USER AND STORE IN DATABASE
      var access_token = req.headers.access_token
      const {data: userData} = await axios.get(
        'https://api.spotify.com/v1/me',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )

      const [currentUser] = await User.findOrCreate({
        where: {
          spotifyId: userData.id,
          email: userData.email
        }
      })
      await currentUser.update({
        email: userData.email,
        display_name: userData.display_name,
        href: userData.href,
        images: userData.images.map(i => i.url)
      })

      // GET LONG TERM TOP ARTISTS AND STORE IN DATA BASE
      const {data: artistData} = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )

      let artistArray = artistData.items
      for (let i = 0; i < artistArray.length; i++) {
        let artist = artistArray[i]
        const [currentArtist] = await Artist.findOrCreate({
          where: {
            name: artist.name
          }
        })
        await currentArtist.update({
          genres: artist.genres,
          spotifyId: artist.id,
          popularity: artist.popularity,
          images: userData.images.map(image => image.url)
        })
        const [currentArtistMatch] = await FavoriteArtist.findOrCreate({
          where: {
            artistId: currentArtist.id,
            userId: currentUser.id,
            timeRange: 'long_term'
          }
        })
      }

      // GET MEDIUM TERM TOP ARTISTS AND STORE IN DATA BASE
      const {data: artistDataMediumTerm} = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )
      let artistArrayMediumTerm = artistDataMediumTerm.items
      for (let i = 0; i < artistArrayMediumTerm.length; i++) {
        let artist = artistArrayMediumTerm[i]
        const [currentArtist] = await Artist.findOrCreate({
          where: {
            name: artist.name
          }
        })
        await currentArtist.update({
          genres: artist.genres,
          spotifyId: artist.id,
          popularity: artist.popularity,
          images: userData.images.map(image => image.url)
        })
        const [currentArtistMatch, created] = await FavoriteArtist.findOrCreate(
          {
            where: {
              artistId: currentArtist.id,
              userId: currentUser.id
            }
          }
        )
        if (created) {
          await currentArtistMatch.update({
            timeRange: 'medium_term'
          })
        }
      }

      // GET SHORT TERM TOP ARTISTS AND STORE IN DATA BASE
      const {data: artistDataShortTerm} = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )
      let artistArrayShortTerm = artistDataShortTerm.items
      for (let i = 0; i < artistArrayShortTerm.length; i++) {
        let artist = artistArrayShortTerm[i]
        const [currentArtist] = await Artist.findOrCreate({
          where: {
            name: artist.name
          }
        })
        await currentArtist.update({
          genres: artist.genres,
          spotifyId: artist.id,
          popularity: artist.popularity,
          images: userData.images.map(image => image.url)
        })
        const [currentArtistMatch, created] = await FavoriteArtist.findOrCreate(
          {
            where: {
              artistId: currentArtist.id,
              userId: currentUser.id
            }
          }
        )
        if (created) {
          await currentArtistMatch.update({
            timeRange: 'short_term'
          })
        }
      }

      // GET LONG-TERM TOP TRACKS AND STORE IN DATABASE
      const {data: trackData} = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )

      let trackArray = trackData.items
      for (let i = 0; i < trackArray.length; i++) {
        let track = trackArray[i]
        const [currentSong] = await Song.findOrCreate({
          where: {
            name: track.name
          }
        })
        await currentSong.update({
          artists: track.artists[0].name,
          spotifyId: track.id,
          album: track.album.name,
          popularity: track.popularity
        })
        const [currentSongMatch] = await FavoriteSong.findOrCreate({
          where: {
            songId: currentSong.id,
            userId: currentUser.id,
            timeRange: 'long_term'
          }
        })
      }

      // GET MEDIUM-TERM TOP TRACKS AND STORE IN DATABASE
      const {data: trackDataMediumTerm} = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )

      let trackArrayMediumTerm = trackDataMediumTerm.items
      for (let i = 0; i < trackArrayMediumTerm.length; i++) {
        let track = trackArrayMediumTerm[i]
        const [currentSong] = await Song.findOrCreate({
          where: {
            name: track.name
          }
        })
        await currentSong.update({
          artists: track.artists[0].name,
          spotifyId: track.id,
          album: track.album.name,
          popularity: track.popularity
        })
        const [currentSongMatch, created] = await FavoriteSong.findOrCreate({
          where: {
            songId: currentSong.id,
            userId: currentUser.id
          }
        })
        if (created) {
          await currentSongMatch.update({
            timeRange: 'medium_term'
          })
        }
      }

      // GET SHORT-TERM TOP TRACKS AND STORE IN DATABASE
      const {data: trackDataShortTerm} = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0',
        {
          headers: {Authorization: 'Bearer ' + access_token}
        }
      )

      let trackArrayShortTerm = trackDataShortTerm.items
      for (let i = 0; i < trackArrayShortTerm.length; i++) {
        let track = trackArrayShortTerm[i]
        const [currentSong] = await Song.findOrCreate({
          where: {
            name: track.name
          }
        })
        await currentSong.update({
          artists: track.artists[0].name,
          spotifyId: track.id,
          album: track.album.name,
          popularity: track.popularity
        })
        const [currentSongMatch, created] = await FavoriteSong.findOrCreate({
          where: {
            songId: currentSong.id,
            userId: currentUser.id
          }
        })
        if (created) {
          await currentSongMatch.update({
            timeRange: 'short_term'
          })
        }
      }

      // LOGIN CURRENT USER AND RETURN
      req.login(currentUser, err => (err ? next(err) : res.json(currentUser)))
    } catch (err) {
      next(err)
    }
  })

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
