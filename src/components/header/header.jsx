import React from "react";

import "./header.scss";
import { Button, Avatar } from "antd";
import { remove } from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/user.actions";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export const Header = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    remove("token");
    dispatch(setUser({}));
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        <h2 className="logo-text">Studsys.</h2>
      </Link>
      {user.role && 
        <div className="user-name">
          <Link to="/profile" ><h3 className="user-nickName">{user.userName}</h3></Link>
          {user.role === "student" ? (
            <Avatar
              style={{ backgroundColor: "#d9d9d9", width:"1.75rem", height: "1.75rem" }}
              icon={<UserOutlined />}
            />
          ) : (
            <Avatar size={35} style={{ backgroundColor: "#2f4f4f" }}>
              Admin
            </Avatar>
          )}
        </div>
      }

      {user.role ? (
        <Button type="primary" danger onClick={logout}>
          Sign Out
        </Button>
      ) : (
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      )}
    </div>
  );
};