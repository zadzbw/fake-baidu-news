/**
 * Created by zad on 16/9/23.
 */
import React from 'react';
import {Link} from 'react-router';
import {is} from 'immutable';

import classNames from 'classnames';

import './Carousel.less';

var interval, startX, tempX, diffX, step;
var startTime, diffTime;

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: 'left'
        };
        this.autoCarousel = this.autoCarousel.bind(this);
        this.controlStart = this.controlStart.bind(this);
        this.controlMove = this.controlMove.bind(this);
        this.controlEnd = this.controlEnd.bind(this);
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
        this.autoCarousel();
        this.refs.content.addEventListener('touchstart', this.controlStart, false);
        this.refs.content.addEventListener('touchmove', this.controlMove, false);
        this.refs.content.addEventListener('touchend', this.controlEnd, false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(is(nextProps.carousel, this.props.carousel) && _.isEqual(nextState, this.state));
    }

    componentWillUnmount() {
        clearInterval(interval);
        this.refs.content.removeEventListener('touchstart', this.controlStart, false);
        this.refs.content.removeEventListener('touchmove', this.controlMove, false);
        this.refs.content.removeEventListener('touchend', this.controlEnd, false);
    }

    autoCarousel() {
        interval = setInterval(()=> {
            var len = this.props.carousel.toJS().length;
            var index = this.state.index;

            if (len > 1) {
                if (index < len - 1) {
                    this.setState({
                        index: ++index,
                        direction: 'left'
                    });
                } else {
                    this.setState({
                        index: 0,
                        direction: 'left'
                    });
                }
            } else {
                clearInterval(interval);
            }
        }, this.props.interval);
    }

    controlStart(e) {
        clearInterval(interval);
        startX = e.touches[0].clientX;
        tempX = e.touches[0].clientX;
        diffX = 0;
        startTime = +new Date();
    }

    controlMove(e) {
        //在滑动时,禁止页面滚动
        e.preventDefault();

        diffX = e.touches[0].clientX - startX;
        step = e.touches[0].clientX - tempX;
        tempX = e.touches[0].clientX;

        var carouselItems = document.getElementsByClassName('carousel-item');
        Array.prototype.forEach.call(carouselItems, (item)=> {
            var WebkitTransform = item.style.WebkitTransform;
            var transform = item.style.transform;
            var reg = /-?[0-9]+\.?[0-9]*/g;
            var WebkitTranslateX = WebkitTransform.match(reg)[0];
            var translateX = transform.match(reg)[0];
            item.style.transitionDuration = '0ms';
            item.style.WebkitTransform = `translateX(${(~~WebkitTranslateX) + (~~step)}px)`;
            item.style.transform = `translateX(${(~~translateX) + (~~step)}px)`;
        });
    }

    controlEnd() {
        this.autoCarousel();

        var {index} = this.state;
        var len = this.props.carousel.toJS().length;
        var carouselItems = document.getElementsByClassName('carousel-item');

        diffTime = (+new Date() - startTime) / 1000;
        var speed = diffX / diffTime;

        if (diffX > 150 || speed > 200) {
            // to right
            // 如果向右move大于150px,则图片向右偏移
            Array.prototype.forEach.call(carouselItems, (item, i)=> {
                item.style.transitionDuration = (i == index || i == ((index - 1 + len) % len)) ? '400ms' : '0ms';
            });

            this.setState({
                index: index > 0 ? index - 1 : len - 1,
                direction: 'right'
            });
        } else if (diffX < -150 || speed < -200) {
            // to left
            // 如果向左move大于150px,则图片向左偏移
            Array.prototype.forEach.call(carouselItems, (item, i)=> {
                item.style.transitionDuration = (i == index || i == ((index + 1 + len) % len)) ? '400ms' : '0ms';
            });

            this.setState({
                index: index < len - 1 ? index + 1 : 0,
                direction: 'left'
            });
        } else {
            var initArray = Carousel.getArray(len);// [2, 0, 1]
            var imageWidth = document.body.clientWidth - 34;

            Array.prototype.forEach.call(carouselItems, (item, i)=> {
                var positionArray = Carousel.left_move(initArray, index);
                var position = _.findIndex(positionArray, (value)=> {
                        return value == i;
                    }) - 1;

                item.style.transitionDuration = '400ms';
                item.style.WebkitTransform = `translateX(${imageWidth * (position)}px)`;
                item.style.transform = `translateX(${imageWidth * (position)}px)`;
            });
        }
    }

    render() {
        var {index, direction} = this.state;
        var imageWidth = document.body.clientWidth - 34;
        var carousel = this.props.carousel.toJS();
        var len = carousel.length;
        var initArray = Carousel.getArray(len);// [2, 0, 1]

        var items = carousel.map((item, i)=> {
            var positionArray = Carousel.left_move(initArray, index);
            // 以positionArray的第二项为视口
            var position = _.findIndex(positionArray, (value)=> {
                    return value == i;
                }) - 1;

            var itemStyle = {
                WebkitTransform: `translateX(${imageWidth * (position)}px)`,
                transform: `translateX(${imageWidth * (position)}px)`,
                left: `-${imageWidth * i}px`
            };
            if (direction == 'left') {
                itemStyle.transitionDuration = (i == index || i == ((index - 1 + len) % len)) ? '400ms' : '0ms';
            } else if (direction == 'right') {
                itemStyle.transitionDuration = (i == index || i == ((index + 1 + len) % len)) ? '400ms' : '0ms';
            }

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
                <div ref='content' className="carousel-content">
                    <div className="carousel-items"
                         style={{width: `${this.props.carousel.toJS().length * (document.body.clientWidth - 34)}px`}}>
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

Carousel.propTypes = {
    interval: React.PropTypes.number.isRequired,
    carousel: React.PropTypes.object.isRequired
};