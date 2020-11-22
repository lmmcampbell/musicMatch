import axios from 'axios'

// ACTION TYPES
const GET_TOP_ARTISTS = 'GET_TOP_ARTISTS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getTopArtists = artists => ({
  type: GET_TOP_ARTISTS,
  artists
})

// THUNKS
export const fetchTopArtists = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/artists/')
      console.log(data)
      dispatch(getTopArtists(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const topArtists = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_ARTISTS:
      return action.artists
    default:
      return state
  }
}
