import axios from 'axios';

const apiUrl = '/api';

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

export const editPost = () => (dispatch, getState) => {
  const { token } = getState();
    dispatch(postIsLoading(true));
    dispatch(postHasError(false));
    dispatch(postSuccess(null));
    
    axios.post(apiUrl + '/posts', {} ,
        {headers: {
            "Authorization" : token
          }
        }
    )
    .then(resp => {
      if (resp.data && !resp.data.error) {
        const message = resp.data.message;
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

export const deletePost = () => (dispatch, getState) => {
  const { token } = getState();
    dispatch(postIsLoading(true));
    dispatch(postHasError(false));
    dispatch(postSuccess(null));
    
    axios.delete(apiUrl + '/posts',
        {headers: {
            "Authorization" : token
          }
        }
    )
    .then(resp => {
      if (resp.data && !resp.data.error) {
        const message = resp.data.message;
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
  const { token } = getState();
    dispatch(postIsLoading(true));
    dispatch(postHasError(false));
    dispatch(postSuccess(null));
    
    axios.get(apiUrl + '/posts',
        {headers: {
            "Authorization" : token
          }
        }
    )
    .then(resp => {
      if (resp.data && !resp.data.error) {
        const message = resp.data.message;
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