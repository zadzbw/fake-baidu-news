/**
 * Created by zad on 16/9/23.
 */
import httpUtil from '../utils/httpUtil';
import apiUtil from '../utils/apiUtil';

export const DO_GET_CAROUSEL = 'DO_GET_CAROUSEL';
export const GET_CAROUSEL_SUCCESS = 'GET_CAROUSEL_SUCCESS';
export const GET_CAROUSEL_FAIL = 'GET_CAROUSEL_FAIL';

export const DO_GET_NEWS_LIST = 'DO_GET_NEWS_LIST';
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS';
export const GET_NEWS_LIST_FAIL = 'GET_NEWS_LIST_FAIL';

var HomeAction = {
    getCarousel(){
        return function (dispatch) {
            dispatch({
                type: DO_GET_CAROUSEL
            });

            httpUtil.GET(apiUtil.CAROUSEL)
                .then((res)=> {
                    dispatch({
                        type: GET_CAROUSEL_SUCCESS,
                        data: res
                    });
                })
                .catch((err)=> {
                    dispatch({
                        type: GET_CAROUSEL_FAIL,
                        data: err
                    });
                });
        };
    },

    getNewsList(){
        return function (dispatch) {
            dispatch({
                type: DO_GET_NEWS_LIST
            });

            httpUtil.GET(apiUtil.GET_NEWS_LIST)
                .then((res)=> {
                    dispatch({
                        type: GET_NEWS_LIST_SUCCESS,
                        data: res
                    });
                })
                .catch((err)=> {
                    dispatch({
                        type: GET_NEWS_LIST_FAIL,
                        data: err
                    });
                });
        };
    }
};

export default HomeAction;