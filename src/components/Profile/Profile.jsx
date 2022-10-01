import React from "react";
import s from "./profile.module.scss";
import UserInfo from "./UserInfo/UserInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
  
  return (
    <div className={s.profile}>
      <h2 className={s.profile__title}>Профиль</h2>
      <UserInfo />
      <MyPosts />
    </div>
  );
};

export default Profile;
