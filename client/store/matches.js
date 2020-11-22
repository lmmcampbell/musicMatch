import axios from 'axios'

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES'
// const UPDATE_MATCHES = 'UPDATE_MATCHES'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getMatches = matches => ({
  type: GET_MATCHES,
  matches
})

// export const updateMatches = match => {
//   return {
//     type: UPDATE_MATCHES,
//     match
//   }
// }

// THUNKS
export const fetchMatches = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/matches/')
      dispatch(getMatches(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addMatch = match => {
  return async () => {
    try {
      console.log('ZEBRA', match)
      const {data} = await axios.post('/api/matches/', match)
      // dispatch(updateMatches(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matches = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES:
      return action.matches
    default:
      return state
  }
}
