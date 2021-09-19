import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { set } from 'js-cookie';
import { postRequest, getRequest } from '../../utils/helpers/request.helpers';
import { setUser } from '../../store/actions/user.actions'
import { useDispatch } from 'react-redux';
import { Facebook } from '../facebook/facebook';

const { Item } = Form; 

export const LoginForm = () => {
  const dispatch = useDispatch();
  
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);
  
  const onFinish = async values => {
    setSpinning(true);

    const { status, data } = await postRequest('/Auth/Login', values);
    
    if(status === 200) {
      if (!data.isEmailConfirmed) {
        form.setFields([{
          name: 'username',
          value: values.username,
          errors: ["Please comfirm your email before start using the application."]
        }]);
        setSpinning(false);
        return;
      };
      if(data.jwtToken != null){
        set('token', data.jwtToken);
        // const userRespounce = await getRequest('/ApplicationUsers/get-authorized');

        dispatch(setUser(data));
      }
    }
    else {
      form.setFields([
        {
          name: 'email',
          value: values.email,
          errors: ["Login or password is invalid"]
        },
        {
          name: 'password',
          value: values.password,
          errors: ["Login or password is invalid"]
        }
      ]);
    }
    setSpinning(false);
  };

  return (
    <Spin tip="Loading..." spinning={spinning}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
      >
        <h1>Sign In</h1>
        <Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Item>
        <Item>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Item>

          <Link to="" className="">
            Forgot password
          </Link>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign in
          </Button>
          <Facebook/>
          Or <Link to="/register">sign up now!</Link> 
        </Item>
      </Form>
      </Spin>
  );
};