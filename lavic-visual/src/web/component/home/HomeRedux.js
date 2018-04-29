/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Data management for the home page
 */

import CommonRedux from '../../utils/CommonRedux';
const initState={
    loading:true,
    error:false,
    list:[],
    page:{
        currentPage:1,
        total:0,
        pageSize:5
    }
};



const LOADING_EXAM = 'LOADING_EXAM',
    LOADING_EXAM_SUCCESS = 'LOADING_EXAM_SUCCESS',
    LOADING_EXAM_ERROR = 'LOADING_EXAM_ERROR';



function loadExamList(params) {
    return {
        url:'http://localhost:8091/exam/queryExamList',
        method: 'POST',
        body:JSON.stringify(Object.assign(
            {
                page:{currentPage:1,pageSize:10}
            }, params)),
        types: [LOADING_EXAM, LOADING_EXAM_SUCCESS, LOADING_EXAM_ERROR]
    };
}


let examListReducer = CommonRedux.fetchRedux(LOADING_EXAM,
    LOADING_EXAM_SUCCESS, LOADING_EXAM_ERROR, initState);


let drawLineReducer = CommonRedux.fetchRedux("DRAW_INIT",
    'DRAW_SUCCESS', 'DRAW_ERROR', {lineData:[]});

let examAction = {
    loadExamList: loadExamList

};
let examReducer = {
    loadExamReducer: examListReducer,
    drawLineReducer
};

export {
    examAction,
    examReducer
};
