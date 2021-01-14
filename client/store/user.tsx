import axios from 'axios'
import history from '../history'
import { Action, Dispatch } from 'redux';
import { ActionType, User, Token } from '../types';

export type UserState = User | null

export type UserAction = Action<ActionType> & {
  user: User
}

/**
 * ACTION TYPES
 */
const GET_USER: ActionType & 'GET_USER' = 'GET_USER'
export const REMOVE_USER: ActionType & 'REMOVE_USER' = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser: UserState = null

/**
 * ACTION CREATORS
 */
const getUser = (user: User) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const me = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSpotifyUser = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post('/spotify/me', null, {
        headers: {access_token: token}
      })
      dispatch(getUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
    // window.location.href = '/'
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action: UserAction) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
