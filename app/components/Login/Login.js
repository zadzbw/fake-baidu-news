import React from 'react';
import ReactDOM from 'react-dom';

import './Login.less';

var log = debug('news:/component/Login');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        this.props.login(username, password);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
    }

    render() {
        log('render');
        return (
            <div className="login-container">
                <p>
                    <span className="fa-stack">
                        <i className="fa fa-camera-retro fa-lg"/>
                    </span>
                    username:<input type="text" ref='username'/>
                </p>
                <p>
                    <span className="fa-stack">
                        <i className="fa fa-ban fa-lg"/>
                    </span>
                    password:<input type="text" ref='password'/>
                </p>
                <button onTouchTap={this.login}>登录</button>
            </div>
        );
    }
}
