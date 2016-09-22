/**
 * Created by zad on 16/9/22.
 */
import httpUtil from '../utils/httpUtil';
import apiUtil from '../utils/apiUtil';

export const DO_GET_HOT_NEWS = 'DO_GET_HOT_NEWS';
export const GET_HOT_NEWS_SUCCESS = 'GET_HOT_NEWS_SUCCESS';
export const GET_HOT_NEWS_FAIL = 'GET_HOT_NEWS_FAIL';

var HotNewsAction = {
    getHotNews(){
        return function (dispatch) {
            dispatch({
                type: DO_GET_HOT_NEWS
            });

            httpUtil.GET(apiUtil.HOT_NEWS)
                .then((res)=> {
                    dispatch({
                        type: GET_HOT_NEWS_SUCCESS,
                        data: res
                    });
                })
                .catch((err)=> {
                    dispatch({
                        type: GET_HOT_NEWS_FAIL,
                        data: err
                    });
                });
        };
    }
};

export default HotNewsAction;