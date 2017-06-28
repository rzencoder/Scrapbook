import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import user from './user';

const rootReducer = combineReducers({posts, user, routing: routerReducer });

export default rootReducer;
