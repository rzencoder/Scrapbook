import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { removePost, addLike } from '../actions/posts'

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return { removePost: bindActionCreators(removePost, dispatch),
           addLike: bindActionCreators(addLike, dispatch)};
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rand: Math.random()
    }
    this.removePost = this.removePost.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  removePost () {
    this.props.removePost({"id": this.props.post._id});
  }

  addLike () {
    this.props.addLike({"id": this.props.post._id});
  }

  render() {
    const { post, i, comments } = this.props;
    const userMatch = this.props.user.username === post.username;
    const sign = this.state.rand > 0.5 ? '' : '-';
    const style = {transform: `rotate(${sign}${this.state.rand * 2}deg)`}
    return (
      <figure className="grid-item" style={style}>
        <div className="grid-image">
          <img src={post.imageUrl} alt={post.title} />
          <CSSTransitionGroup
            transitionName="like"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>
        </div>

        <figcaption className="image-details">
          <p className="photo-title">{post.title}</p>
          <div className="control-buttons">
            <button  onClick={this.addLike} className="likes">&hearts; {post.likes}</button>
            {this.props.user.isAuthenticated &&
              userMatch ? <div className="delete-btn" onClick={this.removePost}><i className="fa fa-trash"></i></div> : ''}
            <Link className={`photo-username ${userMatch ? 'photo-username-active' : ''}`} to={`/posts/${post.username}`}>{post.username}</Link>
          </div>
        </figcaption>

      </figure>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
