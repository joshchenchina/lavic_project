/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Query data render as a Table
 */

import React, {Component} from 'react';
import { Table} from 'antd';
import PropTypes from 'prop-types';

export default class TableView extends Component{
    static propTypes = {
        dataSource: PropTypes.object,
        dispatch: PropTypes.func
    };
    handlePageChange = (page, pageSize)=>{
        this.props.loadExamList({
            query:window.query,
            page: {
                currentPage: page,
                pageSize
            }
        });
    };
    render(){
        const columns = [
            /*{
                title: 'id',
                dataIndex: 'id'
            },*/{
                title: 'School Name',
                dataIndex: 'school_name'
            }, {
                title: 'Academic Year Start',
                dataIndex: 'academic_year_start',
            }, {
                title: 'Academic Year End',
                dataIndex: 'academic_year_end'
            },{
                title: 'Subject',
                dataIndex: 'subject'
            },{
                title: 'Grade',
                dataIndex: 'grade'
            },{
                title: 'Pctadvanced',
                dataIndex: 'pctadvanced'
            },{
                title: 'Pctproficient',
                dataIndex: 'pctproficient'
            },{
                title: 'Pctbasic',
                dataIndex: 'pctbasic'
            },{
                title: 'Pctbelowbasic',
                dataIndex: 'pctbelowbasic'
            }
        ];

        return (
            <div>
                <Table columns={columns}
                       dataSource={this.props.dataSource.list} rowKey="id"
                       onRow={(record) => {
                           return {
                               onClick: () => {
                                   let targetSchool = this.props.dataSource.list.filter(
                                       d=>d.state_school_id === record.state_school_id);
                                   this.props.dispatch({type:"DRAW_SUCCESS",payload:{
                                       lineData: targetSchool
                                   }});
                               }
                           };
                       }}
                       pagination={
                           Object.assign({},
                               this.props.dataSource.page,
                               {
                                   onChange: this.handlePageChange
                               })}
                       bordered />
            </div>
        );
    }
}
