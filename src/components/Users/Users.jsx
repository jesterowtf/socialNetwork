import React, {useEffect, useLayoutEffect} from "react";
import Preloader from "../../UI/Preloader/Preloader";
import User from "./User/User";
import s from "./users.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingProgress, getIsFetching, getUsersData} from "../../redux/selectors/users-selectors.js";
import {getUsers} from "../../redux/users-reducer";
import {getAuthUserId} from "../../redux/selectors/login-selectors";
import {getFollowedUsers} from "../../redux/selectors/profile-selectors";

const Users = (props) => {
  const usersData = useSelector(getUsersData)
  const isFetching = useSelector(getIsFetching)
  const followingProgress = useSelector(getFollowingProgress)
  const authUserId = useSelector(getAuthUserId)
  const followedUsers = useSelector(getFollowedUsers)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(getUsers())
  }, []);

  useEffect(() => {
  }, [followedUsers])

  return (
    <>
      {isFetching ? <Preloader/> :
        <div className={s.users}>
          <h2 className={s.users__title}>Люди</h2>
          <div className={s.pages}>
          </div>
          {usersData.map((u) => {

            if (u._id === authUserId) return null;
            const following = followedUsers?.find((followedUserId) => {
              return followedUserId === u._id
            })

            return (
              <User
                userId={u._id}
                following={following}
                firstName={u.firstName}
                secondName={u.secondName}
                status={u.status}
                photos={u.avatar}
                key={u._id}
                followingProgress={followingProgress}
              />
            );
          })}
        </div>
      }
    </>
  );
};

export default Users;
