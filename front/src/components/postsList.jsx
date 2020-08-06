import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Spin, Space, Alert, Card, List } from 'antd';
import { deletePost, editPost } from '../store/actions/posts.actions';

const PostsList = ({posts, deletePostAction, editPostAction}) => {

  const handleEdit = ({text}, id) => {
    editPostAction({text, id})
  }

  return (
    <Card title="Posts list">
      <List bordered>
        {posts.map(post => 
          <List.Item key={post.id}>
            <Form onFinish={(values) => handleEdit(values, post.id)}>
              <Form.Item initialValue={post.text} name="text">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Form>
            <Button onClick={() => deletePostAction(post.id)}>delete</Button>
          </List.Item>
        )}
      </List>
    </Card>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     posts: state.posts
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    deletePostAction: (id) => dispatch(deletePost(id)),
    editPostAction: (data) => dispatch(editPost(data)),
  };
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  deletePostAction: PropTypes.func.isRequired,
  editPostAction: PropTypes.func.isRequired,
};
  
export default connect(null, mapDispatchToProps)(PostsList);