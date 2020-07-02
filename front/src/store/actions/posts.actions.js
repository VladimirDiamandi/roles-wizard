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

export const editPost = ({text, id}) => (dispatch, getState) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postMutation = gql`
      mutation editPost($text: String!, $id: Int!) {
        editPost(text: $text, id: $id) {
          message
        }
      }
    `;
  client.mutate({
    mutation: postMutation,
    variables: { id: parseInt(id), text }
  }).then(resp => {
    if (resp.data && !resp.data.editPost.error) {
      const message = resp.data.editPost.message;
      dispatch(postSuccess(message));
      let posts = getState().posts;
      posts = posts.map(post => {
        if (post.id === id) {
          post.text = text;
        }
        return post;
      });
      dispatch(setPosts(posts));
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

const postMutation = gql`
      mutation createPost($text: String!) {
        createPost(text: $text) {
          id
          message
        }
      }
    `;

export const deletePost = (id) => (dispatch, getState) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postMutation = gql`
      mutation deletePost($id: Int!) {
        deletePost(id: $id) {
          message
        }
      }
    `;
  client.mutate({
    mutation: postMutation,
    variables: { id: parseInt(id) }
  }).then(resp => {
    if (resp.data && !resp.data.deletePost.error) {
      const message = resp.data.deletePost.message;
      dispatch(postSuccess(message));
      let posts = getState().posts;
      posts = posts.filter(post => post.id !== id);
      dispatch(setPosts(posts));
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

export const createPost = ({text}) => (dispatch, getState) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postMutation = gql`
      mutation createPost($text: String!) {
        createPost(text: $text) {
          id
          message
        }
      }
    `;

  client.mutate({
    mutation: postMutation,
    variables: { text }
  }).then(resp => {
    if (resp.data && !resp.data.createPost.error) {
      const message = resp.data.createPost.message;
      dispatch(postSuccess(message));
      let posts = getState().posts;
      posts.push({
        id: resp.data.createPost.id,
        text
      });
      dispatch(setPosts(posts));
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

export const POSTS_DATA = 'POST_DATA';
export function setPosts(posts) {
  return {
    type: POSTS_DATA,
    posts: posts
  };
}

export const getPosts = () => (dispatch) => {
  dispatch(postIsLoading(true));
  dispatch(postHasError(false));
  dispatch(postSuccess(null));
  const postQuery = gql`
      query {
        getPosts {
          id
          text
        }
      }
    `;
  client.query({
    query: postQuery,
    fetchPolicy: "network-only",
  }).then(resp => {
    if (resp.data && resp.data.getPosts) {
      const posts = resp.data.getPosts;
      dispatch(postSuccess('Fetch fresh posts'));
      dispatch(setPosts(posts));
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