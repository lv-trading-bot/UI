import {combineReducers} from 'redux';
import overview from './overview';
import trigger from './trigger';
import trade from './trade';

export default combineReducers({overview, trigger, trade});