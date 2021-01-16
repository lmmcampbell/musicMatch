import { User, MatchesAction } from '../types';

export type MatchHighlightState = User | null

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES'

// INITIAL STATE
const initialState: MatchHighlightState = null

// REDUCER
export const matchHighlight = (state = initialState, action: MatchesAction) => {
  switch (action.type) {
    case GET_MATCHES: {
      const allMatches = action.matches.approvedMatches
      const num = Math.floor(Math.random() * Math.floor(allMatches.length))
      return allMatches[num] || null
    }
    default:
      return state
  }
}
