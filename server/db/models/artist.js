const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  popularity: {
    type: Sequelize.INTEGER
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Artist
