import axios from 'axios'
import { Action, Dispatch } from 'redux';
import { AppState, Song } from '../types';

// ACTION TYPES
// enum ActionTypes {
//   GET_TOP_SONGS = 'GET_TOP_SONGS',
//   GET_TOP_ARTISTS = '',
// };
// const GET_TOP_SONGS = ActionTypes.GET_TOP_SONGS;

export type ActionType = 'GET_TOP_SONGS' | 'GET_TOP_ARTISTS';

export type SongsState = Song[]
export type SongAction = Action<ActionType> & {
  songs: Song[]
}
const GET_TOP_SONGS: ActionType & 'GET_TOP_SONGS' = 'GET_TOP_SONGS';

// INITIAL STATE
const initialState: SongsState = []

// ACTION CREATORS
const getTopSongs = (songs: Song[]): SongAction => ({
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
export const topSongs = (state = initialState, action: SongAction) => {
  switch (action.type) {
    case GET_TOP_SONGS:
      return action.songs
    default:
      return state
  }
}
