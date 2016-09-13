/**
 * Created by zad on 16/9/13.
 */
import ajax from '../utils/ajaxUtil';

export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

let LoginAction = {
    login(username, password){
        return function (dispatch) {
            dispatch({
                type: DO_LOGIN,
                data: {
                    username,
                    password
                }
            });

            let params = {username, password};

            ajax.POST('api/login', params)
                .then((res)=> {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: res
                    });
                })
                .catch((err)=> {
                    dispatch({
                        type: LOGIN_FAIL,
                        data: err
                    });
                });

        };
    }
};

export default LoginAction;