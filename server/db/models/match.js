const Sequelize = require('sequelize')
const db = require('../db')

const Match = db.define('match', {
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Match
