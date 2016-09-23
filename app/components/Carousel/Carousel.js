/**
 * Created by zad on 16/9/23.
 */
import React from 'react';
import {browserHistory} from 'react-router';

import './Carousel.less';

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.toSingle = this.toSingle.bind(this);
    }

    componentDidMount() {
        this.props.getCarousel();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    toSingle(url) {
        return function () {
            browserHistory.push(url);
        };
    }

    render() {
        var items = this.props.carousel.map((item, i)=> {
            return (
                <a className="carousel-item"
                   key={`carousel${i}`}
                   onTouchTap={this.toSingle(`/main/post/${item.postId}`)}
                >
                    <img src={item.imageUrl} alt={item.title}/>
                    <p className="carousel-item-text">
                        <span>{item.title}</span>
                    </p>
                </a>
            );
        });

        return (
            <div className="carousel-container">
                <div className="carousel-content">
                    <div className="carousel-items"
                         style={{width: `${this.props.carousel.length * (document.body.clientWidth - 34)}px`}}>
                        {items}
                    </div>
                </div>
                <div className="carousel-nav">nav</div>
            </div>
        );
    }
}