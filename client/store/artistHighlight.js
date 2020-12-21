// ACTION TYPES
const GET_TOP_ARTISTS = 'GET_TOP_ARTISTS'

// INITIAL STATE
const initialState = {}

// REDUCER
export const artistHighlight = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_ARTISTS: {
      const allArtists = action.artists
      const num = Math.floor(Math.random() * Math.floor(allArtists.length))
      return allArtists[num]
    }
    default:
      return state
  }
}
