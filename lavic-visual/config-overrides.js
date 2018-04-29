/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Configuration file for the backend
 */

const { injectBabelPlugin } = require('react-app-rewired');
/*"transform-decorators-legacy",*/
module.exports = function override(config, env) {
    config = injectBabelPlugin(
        "babel-plugin-transform-decorators-legacy",
        injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
            config
        )
    );
    return config;
};
