/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: deal with the data about exam score
 */

import {examReducer} from '../component/home/HomeRedux';

import {combineReducers} from 'redux';

let examReducx = combineReducers(examReducer);

export default examReducx;
