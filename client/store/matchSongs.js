import axios from 'axios'

// ACTION TYPES
const GET_MATCH_SONGS = 'GET_MATCH_SONGS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getMatchSongs = matchSongs => ({
  type: GET_MATCH_SONGS,
  matchSongs
})

// THUNKS
export const fetchMatchSongs = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/matches/${id}/songs`)
      dispatch(getMatchSongs(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matchSongs = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCH_SONGS:
      return action.matchSongs
    default:
      return state
  }
}
