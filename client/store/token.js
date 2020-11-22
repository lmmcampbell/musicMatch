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
    case SET_TOKEN:
      return action.token
    default:
      return token
  }
}
