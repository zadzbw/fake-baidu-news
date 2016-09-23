/**
 * Created by zad on 16/9/23.
 */
import {DO_GET_CAROUSEL, GET_CAROUSEL_SUCCESS, GET_CAROUSEL_FAIL} from '../../../actions/HomeAction';

export default function (state = {carousel: [], status: 'wait'}, action) {
    switch (action.type) {
        case DO_GET_CAROUSEL:
            return {carousel: state.carousel, status: 'get_carousel_on_progress'};
        case GET_CAROUSEL_SUCCESS:
            return {carousel: action.data, status: 'get_carousel_success'};
        case GET_CAROUSEL_FAIL:
            return {carousel: action.data, status: 'get_carousel_fail'};
        default:
            return state;
    }
}