/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Component of home Page
 */

import React, {Component} from 'react';
import { Layout} from 'antd';
import Map from './Map';
import TableView from './TableView';
import Line from './Line';
const { Header, Footer, Sider, Content } = Layout;


export default class Home extends Component{
    render(){
        return(
            <div style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <Map {...this.props}/>
                        <div id='info'/>
                    </Sider>
                    <Layout>
                        <Header><h1 style={{color: '#fff', textAlign:'center'}}>Header</h1></Header>
                        <Content><TableView dataSource={this.props.exam} {...this.props}/></Content>
                        <Footer><Line {...this.props}/></Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
