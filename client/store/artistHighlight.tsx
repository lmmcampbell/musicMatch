import { Artist, ArtistsAction } from '../types';

export type ArtistHighlightState = Artist | null

// ACTION TYPES
const GET_TOP_ARTISTS = 'GET_TOP_ARTISTS'

// INITIAL STATE
const initialState: ArtistHighlightState = null

// REDUCER
export const artistHighlight = (state = initialState, action: ArtistsAction) => {
  switch (action.type) {
    case GET_TOP_ARTISTS: {
      const allArtists = action.artists
      const num = Math.floor(Math.random() * Math.floor(allArtists.length))
      return allArtists[num]
    }
    default:
      return state
  }
}
