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
import LoginContainer from 'containers/LoginContainer';

//store
import ReduxRootStore from './store/ReduxRootStore';

localStorage.debug = 'news:*';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={ReduxRootStore}>
        <Router history={browserHistory}>
            <Route path="/" component={LoginContainer}/>
        </Router>
    </Provider>, document.getElementById('wrap'));
