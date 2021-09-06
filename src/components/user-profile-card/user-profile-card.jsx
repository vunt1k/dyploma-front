import React, { useState, useEffect } from "react";
import { getRequest } from "../../utils/helpers/request.helpers";
import "./user-profile-card.scss";
import { Spin, Table } from "antd";

export const UserProfileCard = () => {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([{}]);
  const [spinner, setSpinner] = useState(true);

  const columns = [
    {
      title: "Course name",
      dataIndex: "name",
      width: "80%",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { status, data } = await getRequest(
        "/ApplicationUsers/GetAuthorizedUserWithFullInfo"
      );

      if (status === 200) {
        console.log(data);
        setUser(data);
      }
    };

    const fetchCourses = async () => {
      console.log("userId " + user.id);
      const { status, data } = await getRequest(
        `/Courses/GetCoursesByStudentId?userId=${user.id}`
      );

      if (status === 200) {
        console.log(data);
        setCourses(data);
      }
      setSpinner(false);
    };

    if (user.id === undefined) fetchUser();
    if (user.id !== undefined) fetchCourses();
  }, [user.id]);
  return (
    <Spin spinning={spinner}>
      <div className="profile">
        <img
          src="https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg"
          alt="user-logo"
          className="user-logo"
        />
        <div>
          <h2>{user.fullName}</h2>
          <h3>{user.nickName}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Date of birth: {user.dateOfBirth}</h3>
        </div>
        <h5>Registration date: {user.registeredDate}</h5>
      </div>
      <Table
        dataSource={courses}
        columns={columns}
        pagination={false}
        bordered={true}
        className="course-table"
      />
    </Spin>
  );
};
