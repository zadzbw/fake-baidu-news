/**
 * Created by zad on 16/9/22.
 */
import React from 'react';

import './Main.less';

import Header from '../../components/Header/Header';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-wrap">
                <Header title="百度新闻"/>
                {this.props.children}
            </div>
        );
    }
}