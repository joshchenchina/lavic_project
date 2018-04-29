/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: the file to start backend
 */
var register = require('babel-register');
require('babel-polyfill');
//in order to make node distinguish import
register({
    plugins:["transform-decorators-legacy"],
    presets: [ [
        "env",{
            "targets":{
                "node": "current"
            }
        }
    ],"react","stage-0"],
    extensions: [ '.js' ]
});

//Configuration system constant
require("node-envcfg")(require('path').join(__dirname,"./.env.development"));

//initialize the program
require('./src/bin/server.js');
