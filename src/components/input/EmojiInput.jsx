import React, { useCallback, useState } from "react";

import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import {
  commentPostRequest,
} from "../../store/post/slice";

import "./EmojiInput.css";

const EmojiInput = ({ _id }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleOnEnter = useCallback(
    (text) => {
      dispatch(
        commentPostRequest({
          comment: text,
          postId: _id,
          dispatch,
        })
      );
    },
    [_id, dispatch]
  );

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder=""
    />
  );
};

export default EmojiInput;
