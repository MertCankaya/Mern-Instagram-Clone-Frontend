import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoggedUserRequest, logoutUser } from "../../store/auth/slice";
import {
  followUserRequest,
  getSuggestedUsersRequest,
} from "../../store/user/slice";

import "./Right.css";

const Right = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLoggedUserRequest());
    dispatch(getSuggestedUsersRequest());
  }, [dispatch]);

  const user = useSelector(({ auth: { user } }) => user);
  const suggestions = useSelector(({ users: { suggestions } }) => suggestions);

  const followUserHandler = (followingId) => {
    dispatch(followUserRequest({ followingId, dispatch }));
  };

  const logoutHandler = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    Cookies.remove("messagesUserId");
    dispatch(logoutUser());
    window.location.reload();
  };
  return (
    <div className="right__wrapper">
      <div className="right__top__wrapper">
        <div
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
          className="right__image__and__name__wrapper"
        >
          <img src={user?.profilePic} alt="profilePic" />
          <div>
            <div>{user?.name}</div>
            <div>{user?.email}</div>
          </div>
        </div>
        <div onClick={logoutHandler} className="right__logout">
          Logout
        </div>
      </div>
      <div className="right__suggestion__wrapper">
        <div className="right__suggestion__text__wrapper">
          <div>Suggested for you</div>
          <div
            className="right__see__all"
            onClick={() => {
              navigate("/suggestion");
            }}
          >
            See all
          </div>
        </div>
        {suggestions
          ?.map((suggestion) => {
            return (
              <div className="right__suggestion__list__wrapper">
                <div
                  onClick={() => {
                    navigate(`/profile/${suggestion._id}`);
                  }}
                  className="right__suggestion__list__info__wrapper"
                >
                  <img src={suggestion?.profilePic} alt="profilePic" />
                  <div>
                    <div>{suggestion.name}</div>
                    <div>{suggestion.email}</div>
                  </div>
                </div>
                <div
                  className="right__follow__div"
                  onClick={followUserHandler.bind(this, suggestion._id)}
                >
                  {user.following.includes(suggestion._id)
                    ? "following"
                    : "follow"}
                </div>
              </div>
            );
          })
          ?.splice(0, 5)}
      </div>
    </div>
  );
};

export default Right;
