/**
 * Created by zad on 16/9/22.
 */
import React from 'react';
import {connect} from 'react-redux';

import HotNewsAction from '../../actions/HotNewsAction';
import HotNewsScroller from '../../components/HotNewsScroller/HotNewsScroller';

class SingleContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="single-container">
                <div id="hot-scroll-wrap"
                     style={{backgroundColor: '#f5f5f5', paddingTop: '14px', borderBottom: '1px solid #ddd'}}
                >
                    <HotNewsScroller
                        getHotNews={this.props.getHotNews}
                        hotNews={this.props.hotNews}
                        interval={4000}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hotNews: state.HotNews.news.toJS(),
        status: state.HotNews.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHotNews: () => dispatch(HotNewsAction.getHotNews())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleContainer);