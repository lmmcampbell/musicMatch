import axios from 'axios'
import { Action, Dispatch } from 'redux';
import { ActionType, Artist } from '../types';

export type MatchArtistsState = Artist[]
export type MatchArtistsAction = Action<ActionType> & {
  matchArtists: Artist[]
}

// ACTION TYPES
const GET_MATCH_ARTISTS: ActionType & 'GET_MATCH_ARTISTS' = 'GET_MATCH_ARTISTS'

// INITIAL STATE
const initialState: MatchArtistsState = []

// ACTION CREATORS
const getMatchArtists = (matchArtists: Artist[]) => ({
  type: GET_MATCH_ARTISTS,
  matchArtists
})

// THUNKS
export const fetchMatchArtists = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.get(`/api/matches/${id}/artists`)
      dispatch(getMatchArtists(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matchArtists = (state = initialState, action: MatchArtistsAction) => {
  switch (action.type) {
    case GET_MATCH_ARTISTS:
      return action.matchArtists
    default:
      return state
  }
}
