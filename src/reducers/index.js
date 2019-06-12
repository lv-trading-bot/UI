import {combineReducers} from 'redux';
import overview from './overview';
import config from './config';
import status from './status';
import trigger from './trigger';
import trade from './trade';
import advice from './advice';
import pairControl from './pairControl';
import gekko from './gekko';
import backtest from './backtest';

export default combineReducers({overview, config, status, trigger, trade, advice, pairControl, gekko, backtest});