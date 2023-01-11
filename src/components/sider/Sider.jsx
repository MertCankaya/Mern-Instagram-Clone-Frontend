import React, { useState } from "react";
import "./Sider.css";

import instagramTitle from "../../public/images/instagramTitle.png";
import { HiHome } from "react-icons/hi";
import { BsSearch, BsInstagram } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import Drawer from "../reuseable/Drawer/Drawer";
import useComponentVisible from "../../hooks/useComponentVisible";
import Search from "../search/Search";
import Create from "../create/Create";
import Cookies from "js-cookie";

const Sider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = Cookies.get("userId");

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const notifications = useComponentVisible(false);

  const mountedStyle = {
    animation: "inAnimation 0.6s ease-in",
  };
  const unmountedStyle = {
    animation: "outAnimation 0.6s ease-out",
    animationFillMode: "forwards",
  };

  const hideTitle = (title) => {
    if (notifications.isComponentVisible) {
      return;
    } else if (isComponentVisible) {
      return;
    } else {
      return <div>{title}</div>;
    }
  };

  return (
    <div
      style={{ width: isComponentVisible ? "fit-content" : "21rem" }}
      className="sider__wrapper"
    >
      <div ref={ref}>
        {isComponentVisible && (
          <Drawer>
            <Search />
          </Drawer>
        )}
      </div>
      <Create isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <div>
        {isComponentVisible || notifications.isComponentVisible ? (
          <BsInstagram
            className="sider__insta__logo"
            style={
              isComponentVisible || notifications.isComponentVisible
                ? mountedStyle
                : unmountedStyle
            }
            size={36}
          />
        ) : (
          <img
            className="sider__text__logo"
            style={
              !isComponentVisible || notifications.isComponentVisible
                ? mountedStyle
                : unmountedStyle
            }
            src={instagramTitle}
            alt="instagramTitle"
          />
        )}
      </div>
      <div className="sider__Inner__Wrapper">
        <Link
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
          to="/"
        >
          <HiHome size={36} />
          {hideTitle("Home")}
        </Link>
        <Link
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
          onClick={() => {
            setIsComponentVisible(true);
          }}
        >
          <BsSearch size={36} />
          {hideTitle("Search")}
        </Link>
        <Link
          to="/explore"
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
        >
          <MdOutlineExplore size={36} />
          {hideTitle("Explore")}
        </Link>
        <Link
          to="/direct"
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
        >
          <RiMessengerLine size={36} />
          {hideTitle("Messages")}
        </Link>
        <Link
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <AiOutlinePlusSquare size={36} />
          {hideTitle("Create")}
        </Link>
        <Link
          to={`/profile/${userId}`}
          style={{
            width:
              isComponentVisible ||
              (notifications.isComponentVisible && "fit-content"),
          }}
        >
          <RxAvatar size={36} />
          {hideTitle("Profile")}
        </Link>
      </div>
    </div>
  );
};

export default Sider;
