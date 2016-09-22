/**
 * Created by zad on 16/7/15.
 */
import {combineReducers} from 'redux';

import Login from './LoginReducer';
import HotNews from './HotNewsReducer';

const RootReducer = combineReducers({
    Login,
    HotNews
});

export default RootReducer;