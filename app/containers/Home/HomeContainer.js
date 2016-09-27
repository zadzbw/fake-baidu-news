/**
 * Created by zad on 16/9/22.
 */
import React from 'react';
import {connect} from 'react-redux';

import './Home.less';

import HomeAction from '../../actions/HomeAction';

import Carousel from '../../components/Carousel/Carousel';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-wrap">
                <Carousel
                    getCarousel={this.props.getCarousel}
                    carousel={this.props.carousel}
                    interval={4000}
                />
                <div>these are news</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        carousel: state.Home.Carousel.carousel.toJS(),
        news: state.Home.NewsList.news,
        status: state.Home.NewsList.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCarousel: () => dispatch(HomeAction.getCarousel()),
        getNewsList: () => dispatch(HomeAction.getNewsList())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);