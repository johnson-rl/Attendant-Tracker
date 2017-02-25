
import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';// grab reducer from redux-form, name it formReducer

const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
