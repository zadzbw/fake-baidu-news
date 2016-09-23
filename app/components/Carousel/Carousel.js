/**
 * Created by zad on 16/9/23.
 */
import React from 'react';
import {Link} from 'react-router';

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
        var items = this.props.carousel.map((item, i)=> {
            return (
                <Link className="carousel-item" to={`/main/post/${item.postId}`} key={`carousel${i}`}>
                    <img src={item.imageUrl} alt={item.title}/>
                    <p className="carousel-item-text">
                        <span>{item.title}</span>
                    </p>
                </Link>
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