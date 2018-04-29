import {abnormalAlarmReducer} from '../component/FUNAbnormalAlarm/AbnormalAlarmRedux';
import {combineReducers} from 'redux';

let abnormalReducer = combineReducers(abnormalAlarmReducer);
export default abnormalReducer;
