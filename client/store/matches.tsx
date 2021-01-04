import axios from 'axios'
import { Dispatch } from 'redux';
import { ActionType, Match, Matches, MatchesAction } from '../types';

export type MatchesState = Matches | null


// ACTION TYPES
const GET_MATCHES: ActionType & 'GET_MATCHES' = 'GET_MATCHES'

// INITIAL STATE
const initialState: MatchesState = null

// ACTION CREATORS
const getMatches = (matches: MatchesAction) => ({
  type: GET_MATCHES,
  matches
})

// THUNKS
export const fetchMatches = () => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.get('/api/matches/')
      dispatch(getMatches(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addMatch = (match: Match) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post('/api/matches/', match)
      dispatch(fetchMatches())
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchApproveMatch = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let update = {approved: true}
      await axios.put(`/api/matches/${id}`, update)
      dispatch(fetchMatches())
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchDeleteMatch = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`/api/matches/${id}`)
      dispatch(fetchMatches())
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
export const matches = (state = initialState, action: MatchesAction) => {
  switch (action.type) {
    case GET_MATCHES: {
      let matchObj = action.matches
      let approvedMatches = matchObj.approvedMatches
      let modifiedArray = []
      for (let i = 0; i < approvedMatches.length; i++) {
        if (i % 2 === 0) {
          let miniArray = []
          miniArray.push(approvedMatches[i])
          miniArray.push(approvedMatches[i + 1])
          modifiedArray.push(miniArray)
        }
      }
      matchObj.approvedMatchesRows = modifiedArray
      // reformatting unapproved matches
      let unapprovedMatches = matchObj.matchedMeUnapproved
      let modifiedArray2 = []
      for (let i = 0; i < unapprovedMatches.length; i++) {
        if (i % 2 === 0) {
          let miniArray = []
          miniArray.push(unapprovedMatches[i])
          miniArray.push(unapprovedMatches[i + 1])
          modifiedArray2.push(miniArray)
        }
      }
      matchObj.matchedMeUnapprovedRows = modifiedArray2

      return matchObj
    }
    default:
      return state
  }
}
