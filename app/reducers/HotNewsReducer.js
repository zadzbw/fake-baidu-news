/**
 * Created by zad on 16/7/15.
 */
import {DO_GET_HOT_NEWS, GET_HOT_NEWS_SUCCESS, GET_HOT_NEWS_FAIL} from '../actions/HotNewsAction';

import Immutable from 'immutable';

export default function (state = {news: Immutable.fromJS({code: 'wait', data: []}), status: 'wait'}, action) {
    switch (action.type) {
        case DO_GET_HOT_NEWS:
            return {news: state.news, status: 'get_hot_news_on_progress'};
        case GET_HOT_NEWS_SUCCESS:
            return {news: Immutable.fromJS(action.data), status: 'get_hot_news_success'};
        case GET_HOT_NEWS_FAIL:
            return {news: Immutable.fromJS(action.data), status: 'get_hot_news_fail'};
        default:
            return state;
    }
}