/**
 * Created by zad on 16/10/13.
 */
import React from 'react';
import {is} from 'immutable';

import './News.less';

export default class News extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(is(nextProps.news, this.props.news) && _.isEqual(nextState, this.state));
    }

    render() {
        var news = this.props.news.toJS();
        var imageNum = news.imageUrls ? news.imageUrls.length : 0;

        var topic = '';
        if (news.topic.length) {
            topic = (
                <div className="news-item-text-bottom">
                    <b className="news-item-text-topic">{news.topic[0].name}</b>
                </div>
            );
        }

        switch (imageNum) {
            case 1: {
                return (
                    <div className="news-item-container">
                        <div className="news-item show-left">
                            <div className="news-item-image">
                                <img src={news.imageUrls[0].url} alt=""/>
                            </div>
                            <div className="news-item-text">
                                <div className="news-item-text-title">
                                    {news.title}
                                </div>
                                {topic}
                            </div>
                        </div>
                    </div>
                );
            }
            case 3: {
                var albums = news.imageUrls.map((img, index)=> {
                    return (
                        <div className="news-item-album" key={`news-list-album-${news.postId}-${index}`}>
                            <img src={img.url} alt=""/>
                        </div>
                    );
                });

                return (
                    <div className="news-item-container">
                        <div className="news-item">
                            <div className="news-item-text">
                                <div className="news-item-text-title">
                                    {news.title}
                                </div>
                            </div>
                            <div className="news-item-album-container">
                                {albums}
                            </div>
                            {topic}
                        </div>
                    </div>
                );
            }
            default: {
                return (
                    <div className="news-item-container">
                        <div className="news-item">
                            <div className="news-item-text">
                                <div className="news-item-text-title">
                                    {news.title}
                                </div>
                                {topic}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

News.propTypes = {
    news: React.PropTypes.object.isRequired
};