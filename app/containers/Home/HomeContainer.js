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

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCarousel();
        this.props.getHotNews();
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
                <div>these are news</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        carousel: state.Home.Carousel.carousel,
        hotNews: state.HotNews.news,
        news: state.Home.NewsList.news,
        status: state.Home.NewsList.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCarousel: () => dispatch(HomeAction.getCarousel()),
        getNewsList: () => dispatch(HomeAction.getNewsList()),
        getHotNews: () => dispatch(HotNewsAction.getHotNews())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);