const User = require('./user')
const Artist = require('./artist')
const Song = require('./song')
const FavoriteArtist = require('./favoriteArtist')
const FavoriteSong = require('./favoriteSong')
const Match = require('./match')

User.belongsToMany(Artist, {through: FavoriteArtist})
Artist.belongsToMany(User, {through: FavoriteArtist})
Artist.belongsToMany(User, {through: FavoriteArtist, as: 'user2'})
User.belongsToMany(Song, {through: FavoriteSong})
Song.belongsToMany(User, {through: FavoriteSong})
Song.belongsToMany(User, {through: FavoriteSong, as: 'user2'})
User.belongsToMany(User, {
  through: Match,
  as: 'matchedUser',
  foreignKey: 'userId'
})
// User.hasMany(User, {through: Match, as: 'match', foreignKey: 'userId'})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Artist,
  Song,
  FavoriteArtist,
  FavoriteSong,
  Match
}
