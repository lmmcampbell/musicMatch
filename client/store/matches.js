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
    case GET_MATCHES: {
      let matchObj = action.matches
      let approvedMatches = matchObj.approvedMatches
      let modifiedArray = []
      for (let i = 0; i < approvedMatches.length; i++) {
        if (i % 2 === 0) {
          let miniArray = []
          miniArray.push(approvedMatches[i])
          miniArray.push(approvedMatches[i + 1])
          modifiedArray.push(miniArray)
        }
      }
      matchObj.approvedMatchesRows = modifiedArray
      // reformatting unapproved matches
      let unapprovedMatches = matchObj.matchedMeUnapproved
      let modifiedArray2 = []
      for (let i = 0; i < unapprovedMatches.length; i++) {
        if (i % 2 === 0) {
          let miniArray = []
          miniArray.push(unapprovedMatches[i])
          miniArray.push(unapprovedMatches[i + 1])
          modifiedArray2.push(miniArray)
        }
      }
      matchObj.matchedMeUnapprovedRows = modifiedArray2

      return matchObj
    }
    default:
      return state
  }
}
