import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPosts } from '../actions/posts'
import Post from './Post';
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
  return { loadImages: bindActionCreators(getAllPosts, dispatch) };
}

class UserPosts extends Component {

  componentWillMount () {
    this.props.loadImages()
  }

  render () {

    const posts = this.props.posts.filter( (post) => {return post.username === (this.props.params.currentUser)});
    return (
      <div className="grid-container">
        <h2 className="user-posts-title">{`${this.props.params.currentUser}'s posts`}</h2>
        <Masonry
              className={'grid'}
              elementType={'div'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
        >
          {posts.map((post, i) => <Post {...this.props} key={i} i={i} post={post} />)}
        </Masonry>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
