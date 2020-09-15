import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

const path = "http://localhost:3001";

function mapStateToProps(state) {
  return { user: state.user };
}

class Main extends Component {
  render() {
    const isAuthenticated = this.props.user.isAuthenticated;
    return (
      <div>
        <h1 className="title">
          <a
            className="github logo"
            href="https://github.com/rzencoder/Scrapbook"
          >
            <i className="fa fa-github " aria-hidden="true"></i>
          </a>
          <Link className="heading" to="/">
            Scrapbook
          </Link>
          {!isAuthenticated ? (
            <a href={`${path}/auth/github`} className="logo twitter">
              <i className="fa fa-github" aria-hidden="true"></i> {`  Sign in`}
            </a>
          ) : (
            <Link className="logo twitter profile-btn" to="/profile">
              <button className="profile-btn">Profile</button>
            </Link>
          )}
          <div className="title-border"></div>
        </h1>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
