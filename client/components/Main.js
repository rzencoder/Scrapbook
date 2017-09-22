import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { user: state.user };
}

class Main extends Component {

  render () {
    const isAuthenticated = this.props.user.isAuthenticated;
    return (
      <div>
        <h1 className="title">
          <Link to="/">Scrapbook</Link>
          <i className="fa fa-github github logo" aria-hidden="true"></i>
          {!isAuthenticated ?
            <a href="/auth/twitter" className="logo twitter"><i className="fa fa-twitter" aria-hidden="true"></i> {`  Sign in`}</a>
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

export default connect(mapStateToProps)(Main);
