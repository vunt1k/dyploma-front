import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Form,
  Input,
  Checkbox,
  Button,
  DatePicker,
  Alert,
  Spin,
  Modal,
} from "antd";
import "./register-form.scss";
import { postRequest } from "../../utils/helpers/request.helpers";

const { Item } = Form;
const formLoyaut = "vertical";

export const RegistrationForm = () => {
  const history = useHistory();
  const [pending, setPending] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onFinish = async (values) => {
    setPending(true);
	
    try {
      const resp = await postRequest("/ApplicationUsers/CreateUser", values);
      setPending(false);

      if (resp?.data) {
		  setSuccessMessage(resp.data);
		  setIsModalVisible(true);
      }
    } catch (error) {
      setPending(false);
      form.resetFields();
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
	history.push('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Spin tip="Loading..." spinning={pending}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout={formLoyaut}
          className="register-form"
          scrollToFirstError
        >
          <h1>Sign Up</h1>
          <Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please input your First name!",
              },
              ({ firstNameRegValidator }) => ({
                validator(rule, value) {
                  if (value == null) return Promise.resolve();
                  const reg = new RegExp("^[a-zA-Z]+$");
                  if (reg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Can only contain letters");
                },
              }),
            ]}
          >
            <Input className="item" />
          </Item>
          <Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please input your Last name!",
              },
              ({ lastNameRegValidator }) => ({
                validator(rule, value) {
                  if (value == null) return Promise.resolve();
                  const reg = new RegExp("^[a-zA-Z]+$");
                  if (reg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Can only contain letters");
                },
              }),
            ]}
          >
            <Input />
          </Item>
          <Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                validator: null, //validate password
              },
              ({ passwordValidator }) => ({
                validator(rule, value) {
                  if (value == null) return Promise.resolve();
                  if (value.length >= 8) {
                    return Promise.resolve();
                  }

                  return Promise.reject("Must be at least 8 symbols");
                },
              }),
              ({ passwordValidator }) => ({
                validator(rule, value) {
                  if (value == null) return Promise.resolve();
                  if (value.length < 128) {
                    return Promise.resolve();
                  }

                  return Promise.reject("Password is too long");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Item>

          <Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Item>
          <Item
            name="dateOfBirth"
            label="Date of birth"
            rules={[
              {
                required: true,
                message: "Please input your date of birth!",
              },
              ({ dateOfBirthValidator }) => ({
                validator(rule, value) {
                  if (value == null) return Promise.resolve();
                  const now = new Date();
                  const userDate = new Date(value);
                  console.log(userDate);
                  if (userDate < now) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Data is invalid");
                },
              }),
            ]}
          >
            <DatePicker />
          </Item>
          <Item
            name="agreement"
            valuePropName="checked"
            className="agreement"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I have read the{" "}
              <a
                href="http://www.columbia.edu/~mr2651/ecommerce3/1st/assignments/Assignment%203/Web%20Site%20Development%20_Simple_.pdf"
                target="_blank"
              >
                agreement
              </a>
            </Checkbox>
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Spin>
      <Modal
        title="Sign Up"
        visible={isModalVisible}
        onCancel={handleCancel}
		footer={<Button onClick={handleOk} type="primary">Go to login</Button>}
      >
		{successMessage}
	  </Modal>
    </>
  );
};
