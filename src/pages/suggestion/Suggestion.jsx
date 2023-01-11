import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  followUserRequest,
  getSuggestedUsersRequest,
} from "../../store/user/slice";
import "./Suggestion.css";

const Suggestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSuggestedUsersRequest());
  }, [dispatch]);
  const suggestions = useSelector(({ users: { suggestions } }) => suggestions);
  const user = useSelector(({ auth: { user } }) => user);

  const followUserHandler = (followingId) => {
    dispatch(followUserRequest({ followingId, dispatch }));
  };

  return (
    <div className="suggestion__wrapper">
      <div>Suggested</div>
      <Card className="suggestion__card">
        {suggestions.length > 0 ? (
          suggestions?.map((suggestion) => (
            <div className="suggestion__card__inner__wrapper">
              <div
                onClick={() => {
                  navigate(`/profile/${suggestion._id}`);
                }}
                className="suggestion__card__info__wrapper"
              >
                <img src={suggestion.profilePic} alt="profilePic" />
                <div>
                  <div className="suggestion__name">{suggestion.name}</div>
                  <div style={{ opacity: 0.8 }}>{suggestion.email}</div>
                </div>
              </div>
              {
                <div
                  className="suggestion__follow__div"
                  onClick={followUserHandler.bind(this, suggestion._id)}
                >
                  {user.following.includes(suggestion._id)
                    ? "following"
                    : "follow"}
                </div>
              }
            </div>
          ))
        ) : (
          <div>There is no suggested users.</div>
        )}
      </Card>
    </div>
  );
};

export default Suggestion;
