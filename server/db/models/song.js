const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  name: {
    type: Sequelize.STRING
  },
  artists: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  album: {
    type: Sequelize.STRING
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  popularity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Song
