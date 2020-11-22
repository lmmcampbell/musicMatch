const Sequelize = require('sequelize')
const db = require('../db')

const FavoriteArtist = db.define('favoriteArtist', {
  timeRange: {
    type: Sequelize.STRING
  }
})

module.exports = FavoriteArtist
