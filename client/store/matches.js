import axios from 'axios'

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
const getMatches = matches => ({
  type: GET_MATCHES,
  matches
})

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
  return async dispatch => {
    try {
      await axios.post('/api/matches/', match)
      dispatch(fetchMatches())
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchApproveMatch = id => {
  return async dispatch => {
    try {
      let update = {approved: true}
      await axios.put(`/api/matches/${id}`, update)
      dispatch(fetchMatches())
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchDeleteMatch = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/matches/${id}`)
      dispatch(fetchMatches())
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
