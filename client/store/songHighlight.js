const GET_TOP_SONGS = 'GET_TOP_SONGS'

const initialState = {}

// REDUCER
export const songHighlight = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_SONGS: {
      const allSongs = action.songs
      const num = Math.floor(Math.random() * Math.floor(allSongs.length))
      return allSongs[num]
    }
    default:
      return state
  }
}
