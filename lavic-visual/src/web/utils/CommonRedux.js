/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Abstract Redux base classes
 */

/**
 * Control Redux Creator
 * If there is addtional data, add to payload's data property
 * @param const_show: control visible constants
 * @param const_hide: control invisible constants
 * @param initState initial state
 * @returns {function(*=, *)}
 */
const showOrHideRedux = (const_show, const_hide, initState)=>{
    return (state=initState,action)=>{
        switch (action.type){
            case const_show:{
                return {
                    ...state,
                    isShow: true
                }
            }
            case const_hide:{
                return {
                    ...state,
                    isShow: false
                }
            }
            default:{
                return state;
            }
        }
    }
};
/*const showOrHideRedux = (const_show, const_hide, initState)=>{
    return (state=initState,action)=>{
        switch (action.type){
            case const_show:{
                return {
                    ...state,
                    isShow: true,
                    data: action.payload.data
                }
            }
            case const_hide:{
                return {
                    ...state,
                    isShow: false,
                    data: action.payload.data
                }
            }
            default:{
                return state;
            }
        }
    }
};*/

const fetchRedux = (const_loading, const_load_success, const_load_error, initState)=>{
    return (state=initState,action)=>{
        switch (action.type){
            case const_loading:{
                return {
                    ...state,
                    loading: true,
                    error: false
                }
            }
            case const_load_success:{
                return {
                    ...state,
                    loading: false,
                    error: false,
                    ...action.payload
                }
            }
            case const_load_error:{
                return {
                    ...state,
                    loading: false,
                    error: true
                }
            }
            default:
                return state;
        }
    }
};

const fetchReduxWithInit = (const_init, const_loading, const_load_success, const_load_error, initState)=>{
    return (state=initState,action)=>{
        switch (action.type){
            case const_init:{
                return initState;
            }
            case const_loading:{
                return {
                    ...state,
                    loading: true,
                    error: false
                }
            }
            case const_load_success:{
                return {
                    ...state,
                    loading: false,
                    error: false,
                    ...action.payload
                }
            }
            case const_load_error:{
                return {
                    ...state,
                    loading: false,
                    error: true
                }
            }
            default:
                return state;
        }
    }
};

let commonRedux={
    showOrHideRedux,
    fetchRedux,
    fetchReduxWithInit
};
export default commonRedux;
