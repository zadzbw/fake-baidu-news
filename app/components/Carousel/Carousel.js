/**
 * Created by zad on 16/9/23.
 */
import React from 'react';
import {Link} from 'react-router';

import classNames from 'classnames';

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
        var {carousel} = this.props;
        var imageWidth = document.body.clientWidth - 34;
        var len = carousel.length;
        var initArray = Carousel.getArray(len); // [3, 0, 1, 2]

        var items = carousel.map((item, i)=> {
            var positionArray = Carousel.left_move(initArray, index);
            // 以positionArray的第二项为视口
            var position = _.findIndex(positionArray, (value)=> {
                    return value == i;
                }) - 1;

            var itemStyle = {
                // 正常来说是index + 1,但是因为数组第一项为-1,故为index + 2
                transitionDuration: (((index + 2) % len) == i) ? '0ms' : '500ms',
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

        var navItems = carousel.map((item, i)=> {
            var navClass = classNames('carousel-nav-item', {current: index == i});
            return (<div className={navClass} key={`carousel-nav-item${i}`}></div>);
        });

        return (
            <div className="carousel-container">
                <div className="carousel-content">
                    <div className="carousel-items"
                         style={{width: `${this.props.carousel.length * (document.body.clientWidth - 34)}px`}}>
                        {items}
                    </div>
                </div>
                <div className="carousel-nav">
                    {navItems}
                </div>
            </div>
        );
    }
}