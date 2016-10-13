/**
 * Created by zad on 16/9/22.
 */
import React from 'react';
import {connect} from 'react-redux';

import './Home.less';

import HomeAction from '../../actions/HomeAction';
import HotNewsAction from '../../actions/HotNewsAction';

import Carousel from '../../components/Carousel/Carousel';
import HotNewsScroller from '../../components/HotNewsScroller/HotNewsScroller';
import NewsList from '../../components/NewsList/NewsList';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCarousel();
        this.props.getHotNews();
        this.props.getNewsList();
    }

    render() {
        return (
            <div className="home-wrap">
                <Carousel
                    carousel={this.props.carousel}
                    interval={4000}
                />
                <HotNewsScroller
                    hotNews={this.props.hotNews}
                    interval={4000}
                />
                <NewsList
                    newsList={this.props.newsList}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        carousel: state.Home.Carousel.carousel,
        hotNews: state.HotNews.news,
        newsList: state.Home.NewsList.news,
        status: state.Home.NewsList.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCarousel: () => dispatch(HomeAction.getCarousel()),
        getHotNews: () => dispatch(HotNewsAction.getHotNews()),
        getNewsList: () => dispatch(HomeAction.getNewsList())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);