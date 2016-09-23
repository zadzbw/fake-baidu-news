/**
 * Created by zad on 16/9/23.
 */
import React from 'react';
import {Link} from 'react-router';

import './Carousel.less';

var interval;

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: 0};
        this.swiper = this.swiper.bind(this);
    }

    // 左移数组
    static left_move(arr, num) {
        let result = arr.concat();
        while (num > 0) {
            result.push(result.shift());
            num--;
        }
        return result;
    }

    // 按照长度生成数组
    static getArray(len) {
        var result = [];
        var index = 0;

        len--;
        result.push(len);

        while (len > 0) {
            result.push(index);
            index++;
            len--;
        }
        return result;
    }

    componentDidMount() {
        this.props.getCarousel();
        this.swiper();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    swiper() {
        interval = setInterval(()=> {
            var len = this.props.carousel.length;
            var index = this.state.index;

            if (len > 1) {
                if (index < len - 1) {
                    this.setState({
                        index: ++index
                    });
                } else {
                    this.setState({
                        index: 0
                    });
                }
            } else {
                clearInterval(interval);
            }
        }, 3000);
    }

    render() {
        var {index} = this.state;
        var len = this.props.carousel.length;
        var initArray = Carousel.getArray(len);
        var imageWidth = document.body.clientWidth - 34;

        var items = this.props.carousel.map((item, i)=> {
            var positionArray = Carousel.left_move(initArray, index);
            var position = _.findIndex(positionArray, (value)=> {
                    return value == i;
                }) - 1;

            var itemStyle = {
                transitionDuration: '300ms',
                transform: `translateX(${imageWidth * position}px)`,
                left: `-${imageWidth * i}px`
            };

            return (
                <Link className="carousel-item"
                      to={`/main/post/${item.postId}`}
                      key={`carousel${i}`}
                      style={itemStyle}
                >
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