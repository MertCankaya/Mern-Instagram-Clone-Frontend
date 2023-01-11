import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./SmallSpinner.css";

const antIcon = <LoadingOutlined className="small__spinner" spin />;
const SmallSpinner = () => {
  return (
    <div className="small__spinner__wrapper">
      <Spin indicator={antIcon} />
    </div>
  );
};
export default SmallSpinner;
