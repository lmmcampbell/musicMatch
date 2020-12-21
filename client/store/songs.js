import axios from 'axios'

// ACTION TYPES
const GET_TOP_SONGS = 'GET_TOP_SONGS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getTopSongs = songs => ({
  type: GET_TOP_SONGS,
  songs
})

// THUNKS
export const fetchTopSongs = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      if (!state.topSongs.length) {
        const {data} = await axios.get(`/api/songs/`)
        dispatch(getTopSongs(data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const topSongs = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_SONGS:
      return action.songs
    default:
      return state
  }
}
