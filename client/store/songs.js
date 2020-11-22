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
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/songs/`)
      console.log(data)
      dispatch(getTopSongs(data))
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
