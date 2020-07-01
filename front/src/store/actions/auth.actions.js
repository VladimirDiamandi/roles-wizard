import axios from 'axios';

const apiUrl = '/api';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export function loginIsLoading(bool) {
  return {
    type: LOGIN_PENDING,
    isPending: bool
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token: token
  };
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginHasError(bool) {
  return {
    type: LOGIN_ERROR,
    hasError: bool
  };
}

export function login(data) {
  return (dispatch) => {
    dispatch(loginIsLoading(true));
    dispatch(loginHasError(false));
    axios.post(apiUrl + '/login', data)
      .then(resp => {
        if (resp.data && resp.data.token) {
          const token = resp.data.token;
          dispatch(loginSuccess(token));
        } else {
          dispatch(loginHasError(true));
        }
      })
      .catch(err => {
        dispatch(loginHasError(true));
      })
      .finally(()=>{
        dispatch(loginIsLoading(false));
      });
  };
};