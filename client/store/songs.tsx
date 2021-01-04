import axios from 'axios'
import { Dispatch } from 'redux';
import { AppState, ActionType, Song, SongsAction } from '../types';

export type SongsState = Song[]


const GET_TOP_SONGS: ActionType & 'GET_TOP_SONGS' = 'GET_TOP_SONGS';

// INITIAL STATE
const initialState: SongsState = []

// ACTION CREATORS
const getTopSongs = (songs: Song[]): SongsAction => ({
  type: GET_TOP_SONGS,
  songs
})

// THUNKS
export const fetchTopSongs = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const state = getState()
      if (!state.topSongs.length) {
        const {data} = await axios.get(`/api/songs/`)
        dispatch(getTopSongs(data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const topSongs = (state = initialState, action: SongsAction) => {
  switch (action.type) {
    case GET_TOP_SONGS:
      return action.songs
    default:
      return state
  }
}
