import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesRequest,
  uploadMessageRequest,
} from "../../store/message/slice";
import { getFollowingUserRequest } from "../../store/user/slice";

import InputEmoji from "react-input-emoji";

import "./Messages.css";
import SmallSpinner from "../../components/spinner/SmallSpinner";

const Messages = () => {
  const [text, setText] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const user = useSelector(({ auth: { user } }) => user);
  const messages = useSelector(({ messages: { messages } }) => messages);
  const loading = useSelector(({ messages: { loading } }) => loading);
  
  const followingUsers = useSelector(
    ({ users: { followingUsers } }) => followingUsers
  );
  const loadingPeople = useSelector(({ users: { loading } }) => loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowingUserRequest());
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get("messagesUserId")) {
      dispatch(getMessagesRequest(Cookies.get("messagesUserId")));
    }
  }, [dispatch, loading]);

  const selectMessageUser = (following) => {
    setSelectedUserName(following.name);
    Cookies.set("messagesUserId", following._id);
    dispatch(getMessagesRequest(following._id));
  };

  function handleOnEnter(text) {
    dispatch(uploadMessageRequest(text));
  }

  return (
    <div className="messages__wrapper">
      <div className="messages_left_items">
        <div className="messages__left__top">
          <div className="messages__left__username">{user?.name}</div>
        </div>
        <div className="messages__left__people">
          {loadingPeople ? (
            <SmallSpinner />
          ) : (
            followingUsers.map((following) => {
              return (
                <div
                  onClick={selectMessageUser.bind(this, following)}
                  className="message__following__users__wrapper"
                >
                  <img src={following.profilePic} alt="profilePic" />
                  <div>{following.name}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="messages_right_items">
        <div className="message__right__info">
          <div>{selectedUserName}</div>
        </div>
        <div className="message__field">
          {messages.map((message) => (
            <div
              className={
                message.userId === Cookies.get("userId") &&
                "message__field__inner__wrapper"
              }
            >
              <div
                className={
                  message.userId === Cookies.get("userId")
                    ? "message__user__message"
                    : "message__other__user__message"
                }
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <div className="message__write">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
