import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sider from "../components/sider/Sider";
import Explore from "./explore/Explore";
import Main from "./main/Main";
import Messages from "./messages/Messages";
import Profile from "./profile/Profile";

import "./RouterPage.css";
import Suggestion from "./suggestion/Suggestion";

const RouterPage = () => {
  return (
    <>
      <Sider />
      <div className="router__page__wrapper">
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/direct" element={<Messages />} />
            <Route path="/suggestion" element={<Suggestion />} />
            <Route path="/profile/:profileName" element={<Profile />} />
          </Routes>
        </Container>
      </div>
    </>
  );
};

export default RouterPage;
