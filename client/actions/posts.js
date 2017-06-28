import axios from 'axios';
import { browserHistory } from 'react-router';

export const SAVE_POSTS = 'SAVE_POSTS';

function savePosts(posts) {
	return {
		type: SAVE_POSTS,
		posts
	}
};

export function addPost(data) {
	return dispatch => {
		axios.post('/api/add-post', data).then( response => {
			dispatch(getAllPosts());
			browserHistory.push(`/posts/${data.username}`);
		}).catch((err) => {
				alert(err.response.data);  //SORT OUT ALERTS
				browserHistory.push('/');
		});
	}
};

export function addLike(data) {
	return dispatch => {
		axios.post('/api/add-like', data).then( response => {
			dispatch(getAllPosts());
		}).catch((err) => {
				alert(err.response.data);
				browserHistory.push('/');
		});
	}
}

export function removePost(data) {
	return dispatch => {
		axios.post('/api/remove-post', data).then( response => {
			dispatch(getAllPosts());
		}).catch((err) => {
				alert(err.response.data);
				browserHistory.push('/');
			});
	}
}

export function getAllPosts() {
	return dispatch => {
		axios.get('/api/get-posts').then( response => {
			dispatch(savePosts(response.data));
		}).catch(err => console.log(err));
	}
};
