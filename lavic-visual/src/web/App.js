/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: the file entrance of React
 */

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import router from './routes/index';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import history from './utils/history';
import { LocaleProvider } from 'antd';
/*import zhCN from 'antd/lib/locale-provider/zh_CN';*/
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            {router(history)}
        </Provider>
    );
  }
}

export default App;
