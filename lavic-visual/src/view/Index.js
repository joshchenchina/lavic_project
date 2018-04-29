/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: construct html with React
 */
import React, { Component } from 'react';
let host = process.env.DEV_HOST? `http://${process.env.DEV_HOST}` : "";

export default class Index extends Component {
	render() {
		return (
			<html>
			<head>
				<title>{this.props.title}</title>
				<link rel="manifest" href={`${host}/manifest.json`}/>
				<link href={`${host}/css/styles.css`} rel="stylesheet"/>
				{/*<base target="_blank" />*/}
			</head>
			<body>
			<div id="root" data-to={this.props.to} style={{height:'100%'}}/>
            <script type="text/javascript" src={`${host}/static/js/bundle.js`}></script>
			{/*<script type="text/javascript" src={`${host}/main.js`}></script>*/}
			</body>
			</html>
		);
	}
};
