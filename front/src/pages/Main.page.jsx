import React from "react";
import { Button, Card, Alert, Space, Spin } from 'antd';
import { connect } from 'react-redux';
import { editPost, readPost, deletePost } from '../store/actions/posts.actions';
import PropTypes from 'prop-types';
import CreatePostForm from '../components/createPostForm';

const MainPage = ({ editPost, successMessage, hasErrored, isLoading, deletePost, readPost  }) => {
  return (
    <Card title="Post actions">
        { hasErrored && <Alert message="Posts Error: access forbiden" type="error" /> }
        { successMessage && <Alert message={successMessage} type="success" /> }
        { isLoading ?
        <Space size="large">
          <Spin size="large" />
        </Space>
        :
        <div>
          <Button onClick={() => readPost()}>READ</Button>
          <Button onClick={() => deletePost()}>DELETE</Button>
          <Button onClick={() => editPost()}>EDIT</Button>
          <CreatePostForm />
        </div>
        }
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.postsResult,
    hasErrored: state.postsHasError,
    isLoading: state.postsIsPending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: () => dispatch(deletePost()),
    readPost: () => dispatch(readPost()),
    editPost: () => dispatch(editPost()),
  };
};

MainPage.propTypes = {
  successMessage: PropTypes.string,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired,
  readPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
