import axios from 'axios'

// ACTION TYPES
const GET_MATCH_ARTISTS = 'GET_MATCH_ARTISTS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getMatchArtists = matchArtists => ({
  type: GET_MATCH_ARTISTS,
  matchArtists
})

// THUNKS
export const fetchMatchArtists = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/matches/${id}/artists`)
      dispatch(getMatchArtists(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matchArtists = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCH_ARTISTS:
      return action.matchArtists
    default:
      return state
  }
}
