import {HotResourceRedux} from '../component/analysis/hotResource/HotResourceRedux';
import {ResourceResonseSpeedRedux} from '../component/analysis/resourceResponseSpeed/ResourceResponseSpeedRedux';
import {ResourceUserAccessRedux} from '../component/analysis/resourceUserAccess/ResourceUserAccessRedux';
import {combineReducers} from 'redux';

let ResourceAnalysisRedux = combineReducers({
    hotResource:combineReducers({
        ...HotResourceRedux
    }),
    resourceResponseSpeed:combineReducers({
        ...ResourceResonseSpeedRedux
    }),
    resourceUserAccess:combineReducers({
        ...ResourceUserAccessRedux
    })

});

export default ResourceAnalysisRedux;
