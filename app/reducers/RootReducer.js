/**
 * Created by zad on 16/7/15.
 */
import {combineReducers} from 'redux';

import Login from './LoginReducer';
import HotNews from './HotNewsReducer';
import Home from './Home/HomeReducer';

const RootReducer = combineReducers({
    Login,
    HotNews,
    Home
});

export default RootReducer;