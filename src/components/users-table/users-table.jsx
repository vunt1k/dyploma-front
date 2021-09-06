import React, { useState, useEffect } from "react";
import { postRequest } from "../../utils/helpers/request.helpers";

import "./users-table.scss";
import { Form, Input, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CourseExpandableList } from "../course-expendable-list/course-expendable-list";
import { Link } from "react-router-dom";

const { Item } = Form;
const formLoyaut = "inline";

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [lastSearchData, setLastSearchData] = useState('');

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  });
  const [sorter, setSorter] = useState({order:"",field:""});

  const [form] = Form.useForm();  

  const sortTable = async (pagination, filters, sorter) => {
    setLoader(true);
    setSorter(sorter);

    const { order, field } = sorter;
    const { current, pageSize } = pagination;

    const { data } = await postRequest(`/ApplicationUsers/GetSortedUsers`, { searchString: lastSearchData, order: order ? order : "", field, pageSize, current });
    setUsers(data.users);
    setPagination(data.pageInfo);
    
    setLoader(false);
  };

  const onFinish = async (values) => {
    const { current, pageSize } = pagination;
    const { order, field } = sorter;
    console.log({searchString: values.searchData, order:sorter.order, field:sorter.field, pageSize, current });
    if (values.searchData) {
      setLoader(true);
      setLastSearchData(values.searchData);
      
      console.log(current);
      console.log(pageSize);

      const { status, data } = await postRequest(
        `/ApplicationUsers/GetSortedUsers`,{searchString: values.searchData, order: order ? order : "", field, pageSize, current:1 });  

      if (status === 200) {
        console.log(data);
        setUsers(data.users);
        setPagination(data.pageInfo);
      }
      setLoader(false);
    }
  };

    const clearValue = async () => {
      setLoader(true);
      form.resetFields();
      console.log(sorter);
      setSorter({order:null, field:null, columnKey: null});
      console.log(sorter);
      const { pageSize } = pagination;
      const { data } = await postRequest(
        `/ApplicationUsers/GetSortedUsers`,{searchString : '', order:'ascend', field:'id', pageSize, current:0 });
      
      setUsers(data.users);
      setPagination(data.pageInfo);
      setLastSearchData('');
      setLoader(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      const { status, data } = await postRequest(
        "/ApplicationUsers/GetAllUsers",{current: pagination.current, pageSize: pagination.pageSize, total: pagination.total}
      );
      
      if (status === 200) {
        var i = 1;
        data.users.forEach((x) => {
          x.id = i;
          i += 1;
        });
        console.log(data);
        setUsers(data.users);
        setPagination(data.pageInfo);
        setLoader(false);
      }
    };
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sorter.columnKey === "id" && sorter.order
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      sortOrder: sorter.columnKey === "userName" && sorter.order
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder: sorter.columnKey === "email" && sorter.order
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      sortOrder: sorter.columnKey === "fullName" && sorter.order
    },
    {
      title: "Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: true,
      sortOrder: sorter.columnKey === "dateOfBirth" && sorter.order
    },
    {
      title: "Registered Date",
      dataIndex: "registeredDate",
      key: "registeredDate",
      sorter: true,
      sortOrder: sorter.columnKey === "registeredDate" && sorter.order
    },
  ];

  return (
    <div>
      <Form
        form={form}
        name="searh"
        onFinish={onFinish}
        layout={formLoyaut}
        scrollToFirstError
        className="users-form"
      >
        <Item name="searchData" label={null}>
          <Input className="item" />
        </Item>
        <Item>
          <Button icon={<SearchOutlined />} htmlType="submit">
            Search
          </Button>
        </Item>
        <Item>
          <Button htmlType="button" onClick={clearValue}>
            Clear
          </Button>
        </Item>
        <Link className="link" to="/addCourse">
          Add Course
        </Link>
      </Form>
      
      <Table
        bordered
        columns={columns}
        dataSource={users}
        pagination={pagination}
        loading={loader}
        title={() => "Users table"}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <CourseExpandableList email={record.email} />
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        onChange={sortTable}
      />      
      
    </div>
  );
};