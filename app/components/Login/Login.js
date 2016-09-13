import React from 'react';
import ReactDOM from 'react-dom';
import {Icon} from 'react-fa';

let log = debug('news:/component/Login');

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

    render() {
        log(123);
        return (
            <div>
                <div>
                    <p>
                        <span className="fa-stack">
                            <Icon name="camera-retro" size="lg"/>
                        </span>
                        username:<input type="text" ref='username'/>
                    </p>
                    <p>
                        <span className="fa-stack">
                            <Icon name="ban" size="lg" className="text-danger"/>
                        </span>
                        password:<input type="text" ref='password'/>
                    </p>
                    <button onClick={this.login}>登录</button>
                </div>
            </div>
        );
    }
}
