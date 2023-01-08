import isAdminReducer from './isAdmin';
import followUpReducer from './followUp';
import {combineReducers} from 'redux';
import whoLoggedReducer from './whoLogged';
import vListReducer from './vList';

const allReducers= combineReducers({
    isAdmin:isAdminReducer,
    followUp:followUpReducer,
    whoUser: whoLoggedReducer,
    vList: vListReducer
});

export default allReducers;