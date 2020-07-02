import { gql } from 'apollo-boost';
import { client } from '../../graphql/graphql.client';

export const POSTS_PENDING = 'POST_PENDING';
export function postIsLoading(bool) {
  return {
    type: POSTS_PENDING,
    isPending: bool
  };
}

export const POSTS_SUCCESS = 'POST_SUCCESS';
export function postSuccess(message) {
  return {
    type: POSTS_SUCCESS,
    result: message
  };
}

export const POSTS_ERROR = 'POST_ERROR';
export function postHasError(bool) {
  return {
    type: POSTS_ERROR,
    hasError: bool
  };
}

export const editPost = () => (dispatch) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postMutation = gql`
      mutation {
        editPost {
          message
        }
      }
    `;
  client.mutate({
    mutation: postMutation,
  }).then(resp => {
    if (resp.data && !resp.data.editPost.error) {
      const message = resp.data.editPost.message;
      dispatch(postSuccess(message));
    } else {
      dispatch(postHasError(true));
    }
  })
  .catch(err => {
    dispatch(postHasError(true));
  })
  .finally(()=>{
    dispatch(postIsLoading(false));
  });
};

export const deletePost = () => (dispatch) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postMutation = gql`
      mutation {
        deletePost {
          message
        }
      }
    `;
  client.mutate({
    mutation: postMutation,
  }).then(resp => {
    if (resp.data && !resp.data.deletePost.error) {
      const message = resp.data.deletePost.message;
      dispatch(postSuccess(message));
    } else {
      dispatch(postHasError(true));
    }
  })
  .catch(err => {
    dispatch(postHasError(true));
  })
  .finally(()=>{
    dispatch(postIsLoading(false));
  });
};

export const readPost = () => (dispatch, getState) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postQuery = gql`
      query {
        readPost {
          message
        }
      }
    `;
  client.query({
    query: postQuery,
  }).then(resp => {
    if (resp.data && !resp.data.readPost.error) {
      const message = resp.data.readPost.message;
      dispatch(postSuccess(message));
    } else {
      dispatch(postHasError(true));
    }
  })
  .catch(err => {
    dispatch(postHasError(true));
  })
  .finally(()=>{
    dispatch(postIsLoading(false));
  });
};