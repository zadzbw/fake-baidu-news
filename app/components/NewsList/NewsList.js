/**
 * Created by zad on 16/10/13.
 */
import React from 'react';

import './NewsList.less';

import News from './News/News';

export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $$top = this.props.newsList.get('top');
        var $$newsList = this.props.newsList.get('news');

        var newsList = $$newsList.map(($$item, index)=> {
            return <News news={$$item} key={`news-list-item-${index}`}/>;
        });

        return (
            <div className="news-list-container">
                <News news={$$top}/>
                {newsList}
            </div>
        );
    }
}

NewsList.propTypes = {
    newsList: React.PropTypes.object.isRequired
};