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
  return async (dispatch, getState) => {
    try {
      const state = getState()
      if (!state.topArtists.length) {
        const {data} = await axios.get('/api/artists/')
        dispatch(getTopArtists(data))
      }
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
