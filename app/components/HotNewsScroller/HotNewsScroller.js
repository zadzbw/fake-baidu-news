/**
 * Created by zad on 16/9/22.
 */
import React from 'react';
import {is} from 'immutable';

import './HotNewsScroller.less';

var interval;

export default class HotNewsScroller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: 0,
            animation: true
        };
        this.newsScroll = this.newsScroll.bind(this);
    }

    componentDidMount() {
        this.newsScroll();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(is(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    newsScroll() {
        interval = setInterval(()=> {
            var totalOffset = this.props.hotNews.toJS().data.length - 1;
            var marginTop = this.state.marginTop;

            // 如果hot_news的个数为0或1,则不进行scroll
            if (totalOffset >= 1) {
                if (-18 * totalOffset < this.state.marginTop || this.state.marginTop == 0) {
                    this.setState({
                        marginTop: marginTop - 18,
                        animation: true
                    });
                } else if (this.state.marginTop == -18 * totalOffset) {
                    this.setState({
                        marginTop: 0,
                        animation: false
                    });
                }
            } else {
                clearInterval(interval);
            }
        }, this.props.interval);
    }

    render() {
        var hotNews = this.props.hotNews.toJS();
        var items = hotNews.data.map((item, i)=> {
            return (
                <li className="hot-news-item" key={`hot_news_${i}`}>
                    <a href={`http://m.baidu.com/s?word=${item.query_word}`}>{item.title}</a>
                </li>
            );
        });

        return (
            <div className="hot-scroll-wrap">
                <div className="hot-scroll-container clearfix">
                    <div className="hot-scroll-content">
                        <div className="hot-news-icon pull-left">
                            <span>热点</span>
                        </div>
                        <ul className="hot-news-content pull-left" style={{
                            marginTop: `${this.state.marginTop}px`,
                            transition: this.state.animation ? 'margin-top 1s ease-out' : 'none'
                        }}>
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

HotNewsScroller.propTypes = {
    hotNews: React.PropTypes.object.isRequired,
    interval: React.PropTypes.number.isRequired
};