/**
 * Home page of the system
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import Home from '../component/home/Home';
import {examAction} from '../component/home/HomeRedux';


@connect(
	state=>{
		return {
            exam: state.exam.loadExamReducer,
            lineData: state.exam.drawLineReducer
		};
	},
	dispatch=>{
		return {
		    dispatch,
			push: bindActionCreators(push, dispatch),
            loadExamList: bindActionCreators(examAction.loadExamList,dispatch)
		};
	}
)
class HomeV extends Component{
	render(){
		return (
			<Home {...this.props}/>
		);
	}
}
export default HomeV;
