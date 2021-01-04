import axios from 'axios'
import { Dispatch } from 'redux';
import { AppState, Artist, ArtistsAction } from '../types';

export type ArtistsState = Artist[];


// ACTION TYPES
const GET_TOP_ARTISTS = 'GET_TOP_ARTISTS'

// INITIAL STATE
const initialState: ArtistsState = []

// ACTION CREATORS
const getTopArtists = (artists: Artist[]) => ({
  type: GET_TOP_ARTISTS,
  artists
})

// THUNKS
export const fetchTopArtists = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const state = getState()
      if (!state.topArtists.length) {
        const {data} = await axios.get('/api/artists/')
        dispatch(getTopArtists(data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const topArtists = (state = initialState, action: ArtistsAction) => {
  switch (action.type) {
    case GET_TOP_ARTISTS:
      return action.artists
    default:
      return state
  }
}
