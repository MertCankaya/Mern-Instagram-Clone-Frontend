import { Card } from "antd";
import React, { useState } from "react";

import "./SignPage.css";

import LoginPageImage from "../../public/images/loginPageImage.png";
import InstagramTitle from "../../public/images/instagramTitle.png";
import LoginForm from "../../components/signPage/LoginForm";
import RegisterForm from "../../components/signPage/RegisterForm";

const SignPage = () => {
  const [isLoginComponent, setIsLoginComponent] = useState("Login");

  return (
    <div className="sign__page__wrapper">
      <img src={LoginPageImage} alt="loginPageImage" />
      <div>
        <Card style={{ marginBottom: "0.7rem" }} className="sign__page__card">
          <img
            className="sign__page__instagram__text__img"
            src={InstagramTitle}
            alt="Instagram"
          />
          {isLoginComponent === "Register" && (
            <div className="sign__page__info__text">
             Sign up to see your friends' photos and videos.
            </div>
          )}
          {isLoginComponent === "Login" ? (
            <LoginForm />
          ) : (
            <RegisterForm setIsLoginComponent={setIsLoginComponent} />
          )}
        </Card>
        <Card style={{ padding: "0.5rem" }} className="sign__page__card">
          {isLoginComponent === "Register" ? (
            <div className="have__account__wrapper">
              <div className="have__account">Have an account?</div>
              <div
                className="have__account__text"
                onClick={() => setIsLoginComponent("Login")}
              >
                Login
              </div>
            </div>
          ) : (
            <div className="have__account__wrapper">
              <div className="have__account">Don't Have an Account?</div>
              <div
                className="have__account__text"
                onClick={() => setIsLoginComponent("Register")}
              >
                Sign up
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignPage;
