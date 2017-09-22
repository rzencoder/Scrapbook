import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPosts } from '../actions/posts'
import Post from './Post';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: '0.3s',
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

class PostContainer extends Component {

  componentWillMount () {
    this.props.loadImages();
  }

  render () {

    return (
      <div className="grid-container">
        <Masonry
              className={'grid'}
              elementType={'div'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
        >
          {this.props.posts.map((post, i) => <Post {...this.props} key={i} i={i} post={post} random={Math.random()}/>)}
        </Masonry>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
