import { FETCH_EVENTS, CREATE_EVENTS } from '../actions/index'

const INITIAL_STATE = { events: [] }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_EVENTS:
      return { events: action.payload.data };
    case CREATE_EVENTS:
      return { events: action.payload.data }
    default:
     return state;
  }
}
