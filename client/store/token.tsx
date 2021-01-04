import REMOVE_USER from './user'
import { Action } from 'redux';
import { ActionType, Token } from '../types';

export type TokenAction = Action<ActionType> & {token: Token}

// ACTION TYPES
const SET_TOKEN = 'SET_TOKEN'

// ACTION CREATORS
export const setToken = (token: string) => {
  return {
    type: SET_TOKEN,
    token
  }
}

//initial state
const initialState = {}

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
