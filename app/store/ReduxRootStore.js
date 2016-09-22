/**
 * Created by zad on 16/7/14.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

let ReduxRootStore;
if (process.env.NODE_ENV !== 'production') {
    ReduxRootStore = createStore(RootReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
} else {
    ReduxRootStore = createStore(RootReducer, applyMiddleware(thunk));
}

export default ReduxRootStore;