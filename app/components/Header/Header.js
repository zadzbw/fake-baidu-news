/**
 * Created by zad on 16/9/22.
 */
import React from 'react';
import {browserHistory} from 'react-router';

import './Header.less';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toBack = this.toBack.bind(this);
        this.toHome = this.toHome.bind(this);
    }

    toBack() {
        browserHistory.goBack();
    }

    toHome() {
        browserHistory.push('/home');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    render() {
        return (
            <header className="header">
                <span className="toolbar-left side-padding" onTouchTap={this.toBack}>
                    <i className="fa fa-chevron-left"/>
                </span>
                <span className="header-title">{this.props.title}</span>
                <span className="toolbar-right side-padding" onTouchTap={this.toHome}>
                    <i className="fa fa-home"/>
                </span>
            </header>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};