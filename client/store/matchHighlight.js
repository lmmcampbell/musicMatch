// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES'

// INITIAL STATE
const initialState = {}

// REDUCER
export const matchHighlight = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES: {
      const allMatches = action.matches.approvedMatches
      const num = Math.floor(Math.random() * Math.floor(allMatches.length))
      return allMatches[num]
    }
    default:
      return state
  }
}
