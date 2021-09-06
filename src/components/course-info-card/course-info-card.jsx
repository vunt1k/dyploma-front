import React, { useState, useEffect } from "react";
import { Card, DatePicker, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { AlertOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { postRequest, getRequest } from "../../utils/helpers/request.helpers";

import "./course-info-card.scss";

export const CourseInfoCard = ({ id, name, description, imgUrl, startDate, endDate }) =>{
  const [spinner, setSpinner] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [courseDate, setCourseDate] = useState();
  
  useEffect(() => {
    const checkSubscriptionsStatus = async () => {
      const { status } = await getRequest(
        `/Courses/GetIsUserSubscribedToTheCourse?courseId=${id}`
      );
      if (status === 200) {
        setIsSubscribed(true);
      }
      if(status === 400) {
        
      }
    };

    if (id !== undefined) {
      checkSubscriptionsStatus();
    }
    console.log("id effect " + id);
  }, [id]);

  const disabledDate = (current) => {
    let today = new Date();
    return current && current < today;
  };

  const handleDatePickerChange = (date, dateString) => {
    setCourseDate(dateString);
  };

  const subscribeToCourse = async () => {
    setSpinner(true);

    const { status } = await postRequest("/Courses/SubscribeToCourse", {
      courseId: id,
      startDate: courseDate,
    });
    if(status === 200)
    {
      setIsSubscribed(true);
    }
    setSpinner(false);
  };

  return (
    <Card title={name} className="subscribe-card" spinning={spinner}>
      <img src={imgUrl} alt="courseImage" className="imgsubscribe" />
      <p>{description}</p>      
      {!isSubscribed ? (
        <Spin tip="Subscribing..." spinning={spinner}>
          <div className="subscribe-block">
          <DatePicker
            onChange={(date, dateString) =>
              handleDatePickerChange(date, dateString)
            }
            disabledDate={disabledDate}
            showToday={false}
          />
            <Button type="primary" onClick={subscribeToCourse}>
              Subscribe
            </Button>
          </div>
        </Spin>
      ) : (
        <div className="subscribe-block">
          <h3>
            <AlertOutlined className="logo-succsess"/> You've already registered for the course, you can see the start date in the <Link to="/profile" >profile</Link>. 
          </h3>
        </div>
      )}
    </Card>
  );
}