import axios from 'axios'
import { Action, Dispatch } from 'redux';
import { ActionType, Song } from '../types';

export type MatchSongsState = Song[]
export type MatchSongsAction = Action<ActionType> & {
  matchSongs: Song[]
}

// ACTION TYPES
const GET_MATCH_SONGS: ActionType & 'GET_MATCH_SONGS' = 'GET_MATCH_SONGS'

// INITIAL STATE
const initialState: MatchSongsState = []

// ACTION CREATORS
const getMatchSongs = (matchSongs: MatchSongsState) => ({
  type: GET_MATCH_SONGS,
  matchSongs
})

// THUNKS
export const fetchMatchSongs = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.get(`/api/matches/${id}/songs`)
      dispatch(getMatchSongs(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matchSongs = (state = initialState, action: MatchSongsAction) => {
  switch (action.type) {
    case GET_MATCH_SONGS:
      return action.matchSongs
    default:
      return state
  }
}
