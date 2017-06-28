import { combineReducers } from 'redux'
import { SAVE_POSTS } from '../actions/posts'

const posts = (state = [], action) => {
	switch(action.type) {
		case SAVE_POSTS:
			const allPosts = action.posts.slice();
			return allPosts;
		default:
			return state;
	}
}

export default posts;
