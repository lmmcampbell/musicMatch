import REMOVE_USER from './user'

// ACTION TYPES
const SET_TOKEN = 'SET_TOKEN'

// ACTION CREATORS
export const setToken = token => {
  return {
    type: SET_TOKEN,
    token
  }
}

//initial state
const initialState = {}

//reducer
export const tokenObj = (token = initialState, action) => {
  switch (action.type) {
    case REMOVE_USER:
      return initialState
    case SET_TOKEN:
      return action.token
    default:
      return token
  }
}
