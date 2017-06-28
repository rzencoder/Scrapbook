import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPosts } from '../actions/posts'
import { logout } from '../actions/auth';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0,
    isFitWidth: true,
    gutter: 30
};

function mapStateToProps(state) {
  return { user: state.user,
           posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return { loadPosts: bindActionCreators(getAllPosts, dispatch) };
}

class Main extends Component {

  componentWillMount () {
    this.props.loadPosts() ;
  }

  render () {
    const isAuthenticated = this.props.user.isAuthenticated;
    return (
      <div>
        <h1 className="title">
          <Link to="/">Scrapbook</Link>
          <i className="fa fa-github github logo" aria-hidden="true"></i>
          {!isAuthenticated ?
            <a href="/auth/github" className="logo twitter"><i className="fa fa-twitter" aria-hidden="true"></i> {`  Sign in`}</a>
            :
            <Link className="logo twitter profile-btn" to="/profile"><button className="profile-btn">Profile</button></Link>
             }
          <div className="title-border"></div>
        </h1>
        {this.props.children}
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
