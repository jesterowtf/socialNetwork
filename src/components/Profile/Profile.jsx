import React from "react";
import s from "./profile.module.scss";
import UserInfo from "./UserInfo/UserInfo";
import MyPosts from "./MyPosts/MyPosts";
import CheckEditAccess from "../../helpers/checkEditAccess";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthUserId} from "../../redux/selectors/login-selectors";
import {getFollowedUsers} from "../../redux/selectors/profile-selectors";

const Profile = () => {
  let params = useParams();
  let userId = params.userId;

  const authUserId = useSelector(getAuthUserId)
  const followedUsers = useSelector(getFollowedUsers)
  const userFollowed = followedUsers?.includes(userId)
  const access = CheckEditAccess(authUserId, userId);


  return (
    <div className={s.profile}>
      <h2 className={s.profile__title}>Профиль</h2>
      <UserInfo access={access} userId={userId} userFollowed={userFollowed} authUserId={authUserId}/>
      <MyPosts access={access} userId={userId}/>
    </div>
  );
};

export default Profile;
