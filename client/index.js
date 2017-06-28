import React from 'react';
import { render } from 'react-dom';

// Import css
import css from './styles/style.css';

// Import Components
import Main from './components/Main';
import AddPost from './components/AddPost';
import PostContainer from './components/PostContainer';
import UserPosts from './components/UserPosts';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const Routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={PostContainer}></IndexRoute>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/newpost" component={AddPost}></Route>
        <Route path="/posts/:currentUser" component={UserPosts}></Route>
        <Route path="*" component={NotFound}></Route>
      </Route>
    </Router>
  </Provider>
)

render(Routes, document.getElementById('root'));
