import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { registerUserRequest } from "../../store/auth/slice";

import "./Form.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(registerUserRequest(values));
    form.resetFields();
  };
  const onFinishFailed = () => {
    message.error("Please try again!");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        <Input className="form__input" type="email" placeholder="email" />
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
        <Input.Password className="form__input" placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="profilePic"
        rules={[
          {
            required: true,
            message: "Please input your profile pic url!",
          },
        ]}
      >
        <Input
          className="form__input"
          placeholder="Enter your profile picture URL."
        />
      </Form.Item>
      <Form.Item
        name="sxa"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input className="form__input" placeholder="Enter your name." />
      </Form.Item>

      <Form.Item>
        <Button className="form__button" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
