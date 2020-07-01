import React from "react";
import { Form, Input, Button, Spin, Space, Alert, Card } from 'antd';
import { connect } from 'react-redux';
import { login } from '../store/actions/auth.actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
  
const LoginPage = ({ login, hasErrored, isLoading }) => {
  const onFinish = values => {
    login(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title="Login">
      { hasErrored && <Alert message="Login Error" type="error" /> }
      { isLoading ?
      <Space size="large">
        <Spin size="large" />
      </Space>
      :
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    }
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    hasErrored: state.loginHasError,
    isLoading: state.loginIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      login: (data) => dispatch(login(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
