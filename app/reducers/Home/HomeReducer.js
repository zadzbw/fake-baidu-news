/**
 * Created by zad on 16/9/23.
 */
import {combineReducers} from 'redux';
import NewsList from './NewsListReducer/NewsListReducer';
import Carousel from './CarouselReducer/CarouselReducer';

const HomeReducer = combineReducers({
    NewsList,
    Carousel
});

export default HomeReducer;