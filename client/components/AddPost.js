import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { addPost } from '../actions/posts'
import placeholder from '../styles/img/placeholder.png';

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return { addPost: bindActionCreators(addPost, dispatch) };
}

class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newImage: '',
      newTitle: ''
    };
    this.onSubmitImage = this.onSubmitImage.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillMount () {
    if(!this.props.user.isAuthenticated){
      browserHistory.push('/')
    }
  }

  onSubmitImage (e) {
    e.preventDefault();
    this.setState({
      newImage: this.textInput.value
    });
  }

  addDefaultImageSrc (e) {
    e.target.src = placeholder;
  }

  handleTitleChange (e) {
    this.setState({newTitle: e.target.value});
  }

  onSubmitPost (e) {
    const title = this.state.newTitle;
    const imageUrl = this.state.newImage;
    const username = this.props.user.username;
    if(imageUrl && username){
        this.props.addPost({"username": username,
                            "title": title,
                            "imageUrl": imageUrl});
    }
  }

  render () {

    return (
      <div>
        <div className="add-photo-container">
          <div className="add-photo-form">
            <h2>NEW POST</h2>
            <p>IMAGE URL</p>
            <form onSubmit={this.onSubmitImage}>
              <input ref={(input) => { this.textInput = input; }}></input>
              <button className="btn btn-add" type="submit">Add Image</button>
            </form>
            <p>POST TITLE</p>
            <input value={this.state.newTitle} onChange={this.handleTitleChange}></input>
            <div></div>
          </div>

          <div className="preview-container">
            <h2>PREVIEW</h2>
            <figure className="grid-item">
              <div className="grid-image">
                <img onError={this.addDefaultImageSrc} src={this.state.newImage} alt="preview image" />
              </div>
              <figcaption className="image-details">
                <p className="photo-title">{this.state.newTitle}</p>
                <div className="post-details">
                  <button  className="likes">&hearts; 0</button>
                  <div className="photo-username">{this.props.user.username}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="submit-btn-container">
          <button className="btn btn-submit" onClick={this.onSubmitPost}>Submit Post</button>
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
