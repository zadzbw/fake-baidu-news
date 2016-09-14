/**
 * Created by zad on 16/7/15.
 */
import {combineReducers} from 'redux';

import Login from './LoginReducer';

const RootReducer = combineReducers({
    Login
});

export default RootReducer;