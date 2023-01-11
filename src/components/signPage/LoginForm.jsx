import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUserRequest } from "../../store/auth/slice";

import "./Form.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginUserRequest(values));
  };
  const onFinishFailed = () => {
    message.error("Please try again!");
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form__wrapper"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input className="form__input" placeholder="enter your email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password className="form__input" placeholder="enter your password" />
      </Form.Item>

      <Form.Item>
        <Button className="form__button" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
