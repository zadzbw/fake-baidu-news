/**
 * Created by zad on 16/9/13.
 */
import httpUtil from '../utils/httpUtil';
import apiUtil from '../utils/apiUtil';
import store from 'store';

export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

let LoginAction = {
    login(username, password){
        return function (dispatch) {
            dispatch({
                type: DO_LOGIN
            });

            httpUtil.POST(apiUtil.AUTH, {username, password})
                .then((res)=> {
                    store.set('access_token', res.access_token);
                    store.set('refresh_token', res.refresh_token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: res
                    });
                })
                .catch((err)=> {
                    store.set('access_token', null);
                    store.set('refresh_token', null);
                    dispatch({
                        type: LOGIN_FAIL,
                        data: err
                    });
                });

        };
    }
};

export default LoginAction;