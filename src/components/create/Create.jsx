import { Input, Modal } from "antd";
import React, { useState } from "react";
import "./Create.css";
import { uploadPostRequest } from "../../store/post/slice";
import { useDispatch, useSelector } from "react-redux";

const Create = ({ isModalOpen, setIsModalOpen }) => {
  const [information, setInformation] = useState({
    image: "",
    description: "",
  });
  const dispatch = useDispatch();

  const user = useSelector(({ auth: { user } }) => user);

  const isValidInformation = information.image && information.description;
  const handleOk = () => {
    dispatch(uploadPostRequest(information));
    setInformation({
      image: "",
      description: "",
    });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInformation({
      image: null,
      description: "",
    });
  };

  return (
    <>
      <Modal
        style={{ top: information.image && 40 }}
        className="create__modal"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{
          disabled: isValidInformation ? false : true,
        }}
        cancelButtonProps={{ className: "create__antd__cancel__button" }}
        onCancel={handleCancel}
      >
        <div>
          <div on className="create__modal__profile__wrapper">
            <img
              className="create__profile__image"
              src={user?.profilePic}
              alt="profile_pic"
            />
            <div className="create__username">{user?.name}</div>
          </div>
          <div>
            {information.image ? (
              <img
                className="create__selected__image"
                src={information.image}
                alt="img"
              />
            ) : (
              <Input
                className="create__image__url"
                placeholder="Enter image url.."
                value={information.image}
                onChange={({ target: { value } }) => {
                  setInformation((prev) => {
                    return {
                      ...prev,
                      image: value,
                    };
                  });
                }}
              />
            )}
          </div>
          <Input.TextArea
            placeholder="Enter description.."
            bordered
            rows={7}
            className="create__modal__input"
            onChange={({ target: { value } }) => {
              setInformation((prev) => {
                return {
                  ...prev,
                  description: value,
                };
              });
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Create;
