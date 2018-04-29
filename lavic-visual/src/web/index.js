/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Insert the HTML string generated by react into the corresponding location in HTML.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();