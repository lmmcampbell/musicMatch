const Sequelize = require('sequelize')
const db = require('../db')

const FavoriteSong = db.define('favoriteSong', {
  timeRange: {
    type: Sequelize.STRING
  }
})

module.exports = FavoriteSong
