import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removePost, addLike } from "../actions/posts";

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    removePost: bindActionCreators(removePost, dispatch),
    addLike: bindActionCreators(addLike, dispatch),
  };
}

class Post extends Component {
  constructor(props) {
    super(props);

    this.removePost = this.removePost.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  removePost() {
    this.props.removePost({
      id: this.props.post._id,
      username: this.props.user.username,
    });
  }

  addLike() {
    if (!this.props.post.likeList.includes(this.props.user.username)) {
      this.props.addLike({
        id: this.props.post._id,
        username: this.props.user.username,
      });
    }
  }

  render() {
    const { post } = this.props;
    const userMatch = this.props.user.username === post.username;
    //Rotate Posts - Needs fixing on initial load
    const sign = this.props.random > 0.5 ? "" : "-";
    const style = { transform: `rotate(${sign}${this.props.random * 2}deg)` };

    return (
      <figure className="grid-figure">
        <div className="grid-item" style={style}>
          <div className="grid-image">
            <img src={post.imageUrl} alt={post.title} />

            <span key={post.likes} className="likes-heart">
              {post.likes}
            </span>
          </div>

          <figcaption className="image-details">
            <p className="photo-title">{post.title}</p>
            <div className="post-details">
              <button onClick={this.addLike} className="likes">
                &hearts; {post.likes}
              </button>
              {this.props.user.isAuthenticated && userMatch ? (
                <div className="delete-btn" onClick={this.removePost}>
                  <i className="fa fa-trash"></i>
                </div>
              ) : (
                ""
              )}
              <Link
                className={`photo-username ${
                  userMatch ? "photo-username-active" : ""
                }`}
                to={`/posts/${post.username}`}
              >
                @{post.username}
              </Link>
            </div>
          </figcaption>
        </div>
      </figure>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
