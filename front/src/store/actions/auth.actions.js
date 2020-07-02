import { gql } from 'apollo-boost';
import { client } from '../../graphql/graphql.client';

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
    const LoginMutation = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          message
          token
          error
        }
      }
    `;

    client.mutate({
      mutation: LoginMutation,
      variables: { email: data.email, password: data.password }
    }).then(resp => {
      if (resp.data && resp.data.login && resp.data.login.token) {
        const token = resp.data.login.token;
        localStorage.setItem('token', token);
        dispatch(loginSuccess(token));
      } else {
        dispatch(loginHasError(true));
      }
    })
    .catch(err => {
      console.log('ERROR', err);
      dispatch(loginHasError(true));
    })
    .finally(()=>{
      dispatch(loginIsLoading(false));
    });
  };
};