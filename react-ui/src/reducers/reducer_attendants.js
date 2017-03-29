import { FETCH_ATTENDANT, FETCH_ATTENDANTS, UPDATE_ATTENDANT } from '../actions/index'

const INITIAL_STATE = { attendants: [], attendant: null}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ATTENDANT:
    console.log('payload', action.payload.data)
      return { attendant: action.payload.data };
    case FETCH_ATTENDANTS:
      return { ...state, attendants: action.payload.data };
    // case UPDATE_ATTENDANT:
    //   console.log('payload', action.payload.data)
    //   return { attendant: action.payload.data }
    default:
     return state;
  }
}
