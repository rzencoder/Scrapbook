import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const posts = [];
const user = {};
import api from './middleware/api';
import thunkMiddleware from 'redux-thunk';

const defaultState = {
  posts,
  user
};

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
let store = createStoreWithMiddleware(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
