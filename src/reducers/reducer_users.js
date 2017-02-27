import { FETCH_USER } from '../actions/index'

const INITIAL_STATE = { all: [], user: null}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER:
    return { user: action.payload.data };
    default:
     return state;
  }
}
