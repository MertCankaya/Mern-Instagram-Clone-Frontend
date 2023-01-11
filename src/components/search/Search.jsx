import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsersRequest } from "../../store/user/slice";
import SmallSpinner from "../spinner/SmallSpinner";

import "./Search.css";

const Search = () => {
  const [filteredAllUsers, setFilteredAllUsers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector(({ users }) => users.users);
  const loading = useSelector(({ users: { loading } }) => loading);

  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAllUsers(allUsers?.users);
  }, [allUsers]);
  return (
    <div className="search__wrapper">
      <div className="search__title">Search</div>
      <div className="search__input__wrapper">
        <Input
          prefix={
            <BsSearch style={{ marginRight: "0.6rem", color: "white" }} />
          }
          placeholder="Search"
          className="search_input"
          onChange={({ target: { value } }) => {
            setFilteredAllUsers(() => {
              const filtered = allUsers.users.filter((inside) =>
                inside.name?.toLowerCase().includes(value.toLowerCase())
              );

              return filtered;
            });
          }}
        />
      </div>

      <div className="search__people__wrapper">
        {loading ? (
          <SmallSpinner />
        ) : (
          filteredAllUsers?.map((user) => (
            <div
              onClick={() => {
                navigate(`/profile/${user._id}`, { state: user });
              }}
              className="search__users__wrapper"
            >
              <img src={user.profilePic} alt="userProfilePic" />
              <div>
                <div className="search__user__username">{user.name}</div>
                <div className="search__user__email">{user.email}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
