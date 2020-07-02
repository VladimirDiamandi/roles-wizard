import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Spin, Space, Alert, Card } from 'antd';
import { createPost } from '../store/actions/posts.actions';

const CreatePostForm = ({createPostAction}) => {

  const onSubmit = values => {
    console.log('values', values);
    createPostAction(values);
  };
  
  const onSubmitFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Form
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
      >
        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: 'Post text' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            CREATE
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPostAction: (data) => dispatch(createPost(data)),
  };
};

CreatePostForm.propTypes = {
  createPostAction: PropTypes.func.isRequired,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);