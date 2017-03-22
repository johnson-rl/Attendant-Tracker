
import { combineReducers } from 'redux';
import UserReducer from './reducer_users'
import AttendantReducer from './reducer_attendants'
import EventsReducer from './reducer_event'
import { reducer as formReducer} from 'redux-form';// grab reducer from redux-form, name it formReducer

const rootReducer = combineReducers({
  form: formReducer,
  user: UserReducer,
  attendants: AttendantReducer,
  events: EventsReducer
});

export default rootReducer;
