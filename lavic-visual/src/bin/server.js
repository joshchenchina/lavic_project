/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Startup file for the backend
 */

import Koa from 'koa';
import path from 'path';
const Router = require('koa-router');
import setupViewEngine from 'koa-react-view';
const rp = require('request-promise');
const onerror = require('koa-onerror');
import {KoaRouterController} from 'krc';
//const session = require("koa-session");//Simple session middleware for Koa. Defaults to cookie-based sessions and supports external stores.

console.log("process.env",process.env);

const app = new Koa();

const expPath = /(\w+)\.js$|(\w+)\.css$/g;
const expName = /\w+/g;

//add error handling
onerror(app,{
	all:(param1,param2,param3)=>{
		console.log(param1,param2, param3)
	},
	json:(param1,param2,param3)=>{
		console.log(param1,param2, param3)
	}
});


//Record the request URL
app.use(async (ctx, next) => {
    const ms = new Date() - 1;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    console.log("query",ctx.request.query);
    await next();
});
// response
app.use(require('koa-static-cache')(process.env.STATIC_DIR,{buffer:false,dynamic: true }));


setupViewEngine(app, {
	views: path.join(__dirname, '../view'),
	extname: 'js'
});

const router = new Router();

//homePages of all,  session is given to the front-end routing judgment

let homePages = ["home"];//if not added here, refreshing the browser will prompt "not found". should be same as Router.js
homePages.forEach(element => {
	router.get(element,`/${element}`, async (ctx)=>{
		ctx.state = {
			title: 'LAVIC_Project',
			viewEngine: 'React'
		};
		await ctx.render('Index',{to:`/${element}`});
	});
});

//</editor-fold>

//Register for all the controller
KoaRouterController({
    scanPath: path.join(__dirname, '../controller'),
    router: router
});

//Configure 404,500,etc pages
router.get('*',async (ctx)=>{
    ctx.state = {
        title: 'LAVIC_Project',
        viewEngine: 'React'
    };
    await ctx.render('Page404');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8091,()=>{console.log("localhost:8091 is started")});
//npm install --global --production windows-build-tools
