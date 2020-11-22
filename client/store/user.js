import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  name: 'Anonymous'
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    console.log('HELLO')
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSpotifyUser = token => {
  return async dispatch => {
    try {
      console.log('TOKEN', token)
      const {data} = await axios.post('/spotify/me', null, {
        headers: {access_token: token}
      })
      console.log(data)
      dispatch(getUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
