import axios from 'axios'
import { Action, Dispatch } from 'redux';
import { ActionType, History } from '../types';

export type HistoryState = History
export type HistoryAction = Action<ActionType> & {
  orders: History
}

//ACTION TYPE
const GOT_HISTORY: ActionType & 'GOT_HISTORY' = 'GOT_HISTORY'

const initialState: HistoryState = []

//ACTION CREATOR
const gotHistory = (orders: History) => ({type: GOT_HISTORY, orders})

export const fetchHistory = (userId: number) => async (dispatch: Dispatch) => {
  try {

    const {data} = await axios.get(`/api/cart/history/${userId}`)
    dispatch(gotHistory(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = initialState, action: HistoryAction) => {
  switch (action.type) {
    case GOT_HISTORY:
      return action.orders
    default:
      return state
  }
}
