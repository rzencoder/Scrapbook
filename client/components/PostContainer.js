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

class PostContainer extends Component {

  componentWillMount () {
    this.props.loadImages()
  }

  render () {

    return (
      <div className="grid-container">
        <Masonry
              className={'grid'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {this.props.posts.map((post, i) => <Post {...this.props} key={i} i={i} post={post} />)}
        </Masonry>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
