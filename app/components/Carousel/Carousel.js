/**
 * Created by zad on 16/9/23.
 */
import React from 'react';

import './Carousel.less';

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCarousel();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    render() {
        return (
            <div className="carousel-container">
                <div className="carousel-content">content</div>
                <div className="carousel-nav">nav</div>
            </div>
        );
    }
}