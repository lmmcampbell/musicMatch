import axios from 'axios'

//ACTION TYPE
const GOT_HISTORY = 'GOT_HISTORY'

//ACTION CREATOR
const gotHistory = orders => ({type: GOT_HISTORY, orders})

export const fetchHistory = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/history/${userId}`)
    dispatch(gotHistory(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GOT_HISTORY:
      return action.orders
    default:
      return state
  }
}
