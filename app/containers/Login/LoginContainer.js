import React from 'react';
import {connect} from 'react-redux';

import LoginAction from '../../actions/LoginAction';
import Login from '../../components/Login/Login';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Login
                data={this.props.data}
                login={this.props.login}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.Login.data,
        status: state.Login.status,
        isLogin: state.Login.isLogin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(LoginAction.login(username, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
