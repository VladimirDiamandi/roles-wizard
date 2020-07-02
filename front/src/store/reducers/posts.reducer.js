import { POSTS_ERROR, POSTS_PENDING, POSTS_SUCCESS, POSTS_DATA } from '../actions/posts.actions';

export function postsHasError(state = false, action) {
  switch (action.type) {
    case POSTS_ERROR:
      return action.hasError;
    default:
      return state;
  }
}

export function postsIsPending(state = false, action) {
  switch (action.type) {
    case POSTS_PENDING:
      return action.isPending;
    default:
      return state;
  }
}

export function postsResult(state = null, action) {
  switch (action.type) {
    case POSTS_SUCCESS:
      return action.result;
    default:
      return state;
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case POSTS_DATA:
      return action.posts;
    default:
      return state;
  }
}