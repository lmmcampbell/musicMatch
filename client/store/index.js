import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {topArtists} from './artists'
import {topSongs} from './songs'
import {tokenObj} from './token'
import {matches} from './matches'
import {matchSongs} from './matchSongs'
import {matchArtists} from './matchArtists'
import history from './history'

const reducer = combineReducers({
  user,
  token: tokenObj,
  topArtists: topArtists,
  topSongs: topSongs,
  history: history,
  matches: matches,
  matchSongs: matchSongs,
  matchArtists: matchArtists
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './history'
