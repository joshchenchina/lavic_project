/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: the data source for the program, front end data centralized processing
 */
 
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createFetchMiddleware from 'redux-composable-fetch';
import history from '../utils/history';
import examReducx from './ExamRedux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const fetchJSONMiddleware = createFetchMiddleware({
	afterFetch({action, result}){
		const headers = result.headers;
		const type = headers.get('Content-Type');
		if(type==='text/plain; charset=utf-8'){
			return result.text().then(data=>{
				return Promise.resolve({
					action,
					result: data
				})
			})
		}else {
			return result.json().then(data=>{
				if(+(data.sign)===0){
					localStorage.clear();
					history.push('/');
				}
				return Promise.resolve({
					action,
					result:data
				})
			})
		}
	}
});

const finalCreateStore = composeEnhancers(
	applyMiddleware(
		routerMiddleware(history),
		//fetchIMGMiddleware,
		fetchJSONMiddleware
	)
)(createStore);

	//todo 这个地方需要重构，让每个顶层组件的Redux把自己的reducer维持好，这的前套树可以深一些。
const reducer = combineReducers({
    exam: examReducx,
	router: routerReducer
});

export default function configureStore(initialState) {
	return finalCreateStore(reducer);
}
