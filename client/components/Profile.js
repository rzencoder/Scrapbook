import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkAuth, logout } from '../actions/auth'

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return { checkAuth: bindActionCreators(checkAuth, dispatch),
           logout: bindActionCreators(logout, dispatch)};
}

class Profile extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount(){
    if(!this.props.user.isAuthenticated){
      this.props.checkAuth();
    }
  }

  render () {

    return (
      <div className="profile-container">
        {this.props.user.isAuthenticated ?
          <div>
            <h2>Welcome {this.props.user.username}</h2>
            <Link to={`/posts/${this.props.user.username}`}><button className="your-posts-btn profile-page-btn">Your Posts</button></Link>
            <Link to="/newpost"><button className="add-post-btn profile-page-btn">Add Photo</button></Link>
            <a><button className="logout-btn profile-page-btn" className="logout-btn" onClick={this.props.logout}>Logout</button></a>
          </div> : ''}
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
