import React from "react";
import { Button, Card, Alert, Space, Spin } from 'antd';
import { connect } from 'react-redux';
import { editPost, readPost, deletePost } from '../store/actions/posts.actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
