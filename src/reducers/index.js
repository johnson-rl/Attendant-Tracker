
import { combineReducers } from 'redux';
import UserReducer from './reducer_users'
import AttendantReducer from './reducer_attendants'
import { reducer as formReducer} from 'redux-form';// grab reducer from redux-form, name it formReducer

const rootReducer = combineReducers({
  form: formReducer,
  user: UserReducer,
  attendants: AttendantReducer
});

export default rootReducer;
