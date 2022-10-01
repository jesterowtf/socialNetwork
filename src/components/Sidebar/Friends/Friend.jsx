import React from "react";
import s from "./friend.module.scss";

const Friend = (props) => {
  return (
    <div className={s.friendsItem}>
      <div className={s.ava}>
        <img src={props.ava} alt="" className={s.friendsImg} key={props.id} />
      </div>
      {props.name}
    </div>
  );
};

export default Friend;
