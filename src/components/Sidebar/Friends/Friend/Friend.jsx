import React from "react";
import s from "./friend.module.scss";
import {Link} from "react-router-dom";

const Friend = (props) => {

  const {firstName, id, avatar, secondName} = props;

  return (
    <Link to={`/profile/${id}`} className={s.friendsLink} title={`${firstName} ${secondName}`}>
      <div className={s.avatar}>
        <img src={`${process.env.REACT_APP_STATIC_FILES_URL}${avatar}`} className={s.friendsImg} key={id}   alt={firstName}/>
      </div>
      {firstName}
    </Link>
  );
};

export default Friend;
