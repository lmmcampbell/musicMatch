import { Match, MatchesAction } from '../types';

export type MatchHighlightState = Match | null

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
      return allMatches[num]
    }
    default:
      return state
  }
}
