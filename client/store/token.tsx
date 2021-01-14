import {REMOVE_USER} from './user'
import { ActionType, Token, TokenAction } from '../types';

export type TokenState = Token | null

// ACTION TYPES
const SET_TOKEN: ActionType = 'SET_TOKEN'

// ACTION CREATORS
export const setToken = (token: Token) => {
  return {
    type: SET_TOKEN,
    token
  }
}

//initial state
const initialState: TokenState = null

//reducer
export const tokenObj = (token = initialState, action: TokenAction) => {
  switch (action.type) {
    case REMOVE_USER:
      return initialState
    case SET_TOKEN:
      return action.token
    default:
      return token
  }
}
