/**
 * Created by zad on 16/7/14.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

const ReduxRootStore = createStore(RootReducer, compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.devToolsExtension && window.devToolsExtension()
));

export default ReduxRootStore;