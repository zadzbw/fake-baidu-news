/**
 * Created by zad on 16/9/23.
 */
import {DO_GET_NEWS_LIST, GET_NEWS_LIST_SUCCESS, GET_NEWS_LIST_FAIL} from '../../../actions/HomeAction';

import Immutable from 'immutable';

var initNewsList = {
    total: 200,
    top: {
        postId: 5,
        title: '',
        url: '',
        imageUrls: [],
        site: '',
        type: '',
        topic: []
    },
    news: [
        {
            postId: 6,
            title: '',
            url: '',
            imageUrls: [],
            site: '',
            type: '',
            topic: []
        }
    ]
};

export default function (state = {news: Immutable.fromJS(initNewsList), status: 'wait'}, action) {
    switch (action.type) {
        case DO_GET_NEWS_LIST:
            return {news: state.news, status: 'get_news_list_on_progress'};
        case GET_NEWS_LIST_SUCCESS:
            return {news: Immutable.fromJS(action.data), status: 'get_news_list_success'};
        case GET_NEWS_LIST_FAIL:
            return {news: Immutable.fromJS(action.data), status: 'get_news_list_fail'};
        default:
            return state;
    }
}