export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})
export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})
export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})
export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})
const fetchPosts = subreddit => async dispatch => {
  console.log("fetchpost action")
  //dispatch(requestPosts(subreddit))
  try {
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    const response = await fetch(url)
    const responseBody = await response.json();
    console.log(responseBody)
    dispatch(receivePosts(subreddit, responseBody));
  } catch (error) {
    console.error(error);
  }
}
// const fetchPosts = subreddit => dispatch => {
//   console.log("fetchpost action")
//   dispatch(requestPosts(subreddit))
//   return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//     .then(response => {
//       console.log(response)
//       response.json()  
//     }
//     )
//     .then(json => {
//       console.log(json);
//       dispatch(receivePosts(subreddit, json))})
// }
const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}
export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}


// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const INVALID_SUBREDDIT = 'INVALID_SUBREDDIT'
// export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT"
// export const SELECTED_SUBREDDIT = "SELECTED_SUBREDDIT"
// export const REQUEST_POSTS = 'REQUEST_POSTS'

// export const selectedSubreddit = subreddit => ({
// 	type: SELECTED_SUBREDDIT,
// 	subreddit
// })

// export const selectSubreddit = subreddit => ({
// 	type: SELECT_SUBREDDIT,
// 	subreddit
// })

// export const invalidSubreddit = subreddit => ({
// 	type: INVALID_SUBREDDIT,
// 	subreddit
// })

// export const requestPosts = subreddit => ({
// 	type: REQUEST_POSTS,
// 	subreddit
// })

// export const receivePosts = (subreddit, json) => ({
// 	type: RECEIVE_POSTS,
// 	subreddit,
// 	posts: json.data.children.map(child => child.data),
// 	receivedAt: Date.now()
// })

// const fetchPosts = subreddit => async dispatch => {
// 	try {
// 		const url = `https://www.reddit.com/r/redux.json`;
// 		const response = await fetch(url);
// 		const responseBody = await response.JSON();
// 		console.log(responseBody);
// 		dispatch(receivePosts(subreddit, responseBody))
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

// const shouldFetchPosts = (state, subreddit) => {
// 	const posts = state.postsBySubreddit[subreddit]
// 	if (!posts) {
// 		return true
// 	}
// 	if (posts.isFetching) {
// 		return false
// 	}
// 	return posts.didInvalid
// }

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
// 	if (shouldFetchPosts(getState(), subreddit)) {
// 		return dispatch(fetchPosts(subreddit))
// 	}
// }