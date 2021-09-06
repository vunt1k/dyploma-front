import React, { useState } from 'react';
import {
  Form,
  Input,
  Button
} from 'antd';
import './add-course-form.scss';
import { postRequest } from '../../utils/helpers/request.helpers';
import { UploadOutlined } from '@ant-design/icons';

const formLoyaut = "vertical";

export const AddCourseForm = () => {
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const hangleChange = e => {
    console.log(e.target.files, "value");
    setFile(e.target.files[0]);
  }

  const onFinish = async (values) => {
    const formData = new FormData();
    for (var key in values)
      formData.append(key, values[key]);
    
    formData.append("file", file);  
    console.log(file);
    console.log("Received values of form: ", values);

    const { status, data } = await postRequest('/Courses/AddCourse', formData);
    console.log("errors check", data);

    if (status === 200) {
      console.log(data);
      form.resetFields();
    }    
    else {
      form.setFields([
        {
          name: 'name',
          value: values.name,
          errors: [data.errors['Name'][0]]
        },
        {
          name: 'description',
          value: values.description,
          errors: [data.errors['Description'][0]]
        }
      ]);
    }
    setFile(null);
    
  };

  return (
    <Form
      className="form"
      name="form"
      layout={formLoyaut}
      onFinish={onFinish}
      form={form}
      scrollToFirstError
    >
      <h1 style={{ textAlign: "center" }}>Add Course</h1>
      <Form.Item
        name="name"
        label="Title"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea />
      </Form.Item>
      <label className="file-input-label">
        <input
          id="file-input"
          className="file-input"
          type="file" 
          name="file" 
          onChange={hangleChange}
        />
        <p className="fake-btn"><UploadOutlined /> Upload</p>
        {file && <p className="file-name">{file.name}</p>}
      </label>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form.Item>
    </Form>
  );
}