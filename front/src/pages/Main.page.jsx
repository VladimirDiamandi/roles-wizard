import React, { useEffect } from "react";
import { Button, Card, Alert, Space, Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreatePostForm from '../components/createPostForm';
import PostsList from '../components/postsList';
import { getPosts } from '../store/actions/posts.actions';

const MainPage = ({ successMessage, hasErrored, isLoading, getPostsAction }) => {

  useEffect(getPostsAction, []);

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
          <CreatePostForm />
          <PostsList />
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
    getPostsAction: () => dispatch(getPosts()),
  };
};

MainPage.propTypes = {
  successMessage: PropTypes.string,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPostsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
