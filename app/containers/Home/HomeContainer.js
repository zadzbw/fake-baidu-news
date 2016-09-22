/**
 * Created by zad on 16/9/22.
 */
import React from 'react';

import './Home.less';

export default class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-wrap">
                {this.props.children}
            </div>
        );
    }
}