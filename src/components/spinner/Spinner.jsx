import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./Spinner.css";

const antIcon = <LoadingOutlined className="spinner" spin />;
const Spinner = () => {
  return (
    <div className="spinner__wrapper">
      <Spin indicator={antIcon} />
    </div>
  );
};
export default Spinner;
