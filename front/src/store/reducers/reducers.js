import { combineReducers } from 'redux';
import { loginHasError, loginIsPending, token } from './auth.reducer';
import { postsHasError, postsIsPending, postsResult } from './posts.reducer';

export default combineReducers({
  loginHasError,
  loginIsPending,
  token,
  postsHasError,
  postsIsPending,
  postsResult,
});