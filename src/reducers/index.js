//-------- For combining reducers --------//
import { combineReducers } from 'redux';
import Reducers from './reducer';

const rootReducer = combineReducers({
  reducer:Reducers
});

export default rootReducer;
