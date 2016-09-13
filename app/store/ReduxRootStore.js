/**
 * Created by zad on 16/7/14.
 */
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

const ReduxRootStore = createStore(RootReducer,applyMiddleware(thunk));

export default ReduxRootStore;