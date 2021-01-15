import axios from 'axios'
import { Action, Dispatch } from 'redux';
import { ActionType, Artist, MatchArtists } from '../types';


export type MatchArtistsAction = Action<ActionType> & {
  matchArtists: MatchArtists
}

// ACTION TYPES
const GET_MATCH_ARTISTS: ActionType & 'GET_MATCH_ARTISTS' = 'GET_MATCH_ARTISTS'

// INITIAL STATE
const initialState: MatchArtists = []

// ACTION CREATORS
const getMatchArtists = (matchArtists: Artist[]) => ({
  type: GET_MATCH_ARTISTS,
  matchArtists
})

// THUNKS
export const fetchMatchArtists = (id: string) => {
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
