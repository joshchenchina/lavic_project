/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: configure all routers
 */

/**
 * 所有的路由
 */
import React,{Component} from 'react';
import {Route} from "react-router-dom";
import HomeV from '../view/HomeV';

export default class Routes extends Component{
	render(){
		return (
			<div style={{height:'100%'}}>
				<Route exact path='/' component={HomeV}/>
				<Route exact path='/home' component={HomeV}/>
			</div>
		);
	}
}
