/**
 * Created by zad on 16/7/15.
 */
import {DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/LoginAction';
export default function (state = {text: {}, status: 'wait', isLogin: false}, action) {
    switch (action.type) {
        case DO_LOGIN:
            return {text: state.text, status: 'on_progress', isLogin: false};
        case LOGIN_SUCCESS:
            return {text: action.data, status: 'success', isLogin: true};
        case LOGIN_FAIL:
            return {text: action.data, status: 'fail', isLogin: false};
        default:
            return state;
    }
}