import React, { useEffect, useState } from "react";

import { Result, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../utils/helpers/request.helpers";

import "./confirm-email-page.scss"

export const Confirmation = () => {
  const [resStatus, setResStatus] = useState({
    status: "error",
    title: "Something went wrong, try to register new account again.",
  });
  const [view, setView] = useState(false);

  const { userId, token } = useParams();

  useEffect(() => {
    const confirmEmail = async () => {
      const { status } = await getRequest(
        `/auth/confirmEmail?userId=${userId}&token=${token}`
      );
  
      if (status === 200) {
        setResStatus({
          status: "success",
          title: "You have been successfully register to the Honey Course !",
        });
      } else {
      }
      setView(true);
    };
    confirmEmail();
  }, [userId,token]);

  return (
    <div className="email-confirmation">
      {view && (
        <Result
          status={resStatus.status}
          title={resStatus.title}
          extra={[
            <Link to="/login">
              <Button type="primary">Start learning !</Button>
            </Link>,
          ]}
        />
      )}
    </div>
  );
};
