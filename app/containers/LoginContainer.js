import React from 'react';
import {connect} from 'react-redux';

import LoginAction from '../actions/LoginAction';
import Login from '../components/Login/Login';

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Login login={this.props.Login}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.Login.text,
        status: state.Login.status,
        isLogin: state.Login.isLogin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Login: (username, password) => dispatch(LoginAction.login(username, password))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
