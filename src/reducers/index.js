import {combineReducers} from 'redux';
import overview from './overview';
import status from './status';
import trigger from './trigger';
import trade from './trade';

export default combineReducers({overview, status, trigger, trade});