import { LOGIN_ERROR, LOGIN_PENDING, LOGIN_SUCCESS } from '../actions/auth.actions';

export function loginHasError(state = false, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return action.hasError;
    default:
      return state;
  }
}

export function loginIsPending(state = false, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return action.isPending;
    default:
      return state;
  }
}

export function token(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.token;
    default:
      return state;
  }
}