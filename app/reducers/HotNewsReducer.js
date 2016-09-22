/**
 * Created by zad on 16/7/15.
 */
import {DO_GET_HOT_NEWS, GET_HOT_NEWS_SUCCESS, GET_HOT_NEWS_FAIL} from '../actions/HotNewsAction';

export default function (state = {data: {data: []}, status: 'wait'}, action) {
    switch (action.type) {
        case DO_GET_HOT_NEWS:
            return {data: state.data, status: 'get_hot_news_on_progress'};
        case GET_HOT_NEWS_SUCCESS:
            return {data: action.data, status: 'get_hot_news_success'};
        case GET_HOT_NEWS_FAIL:
            return {data: action.data, status: 'get_hot_news_fail'};
        default:
            return state;
    }
}