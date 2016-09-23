//styles
import '../node_modules/font-awesome/less/font-awesome.less';
import './style/style.less';

//libs
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

//containers
import HomeContainer from 'containers/Home/HomeContainer';
import MainContainer from 'containers/Main/MainContainer';
import LoginContainer from 'containers/Login/LoginContainer';
import SingleContainer from 'containers/Single/SingleContainer';

//store
import ReduxRootStore from './store/ReduxRootStore';

localStorage.debug = 'news:*';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={ReduxRootStore}>
        <Router history={browserHistory}>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/home" component={HomeContainer}/>
            <Route path="/main" component={MainContainer}>
                <Route path="post/:postId" component={SingleContainer}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('wrap'));
