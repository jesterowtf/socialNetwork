import React from "react";
import s from "./message.module.scss";
import {NavLink} from "react-router-dom";

const Message = (props) => {
  let { message, authUserID, authorMessageId } = props;

  const convertedDate = new Date(message.createdAt?.seconds * 1000).toUTCString();
  const postOwner = authUserID === message.uid;
  const classOwner = !!postOwner ? `${s.owner} ${s.message}` : `${s.inbox} ${s.message}`
  return (
      <div className={classOwner}>
        <div className={s.message__head}>
          <NavLink to={`/profile/${authorMessageId}`} >
            <img src={message.photoURL} alt={message.displayName} className={s.message__avatar}/>
          </NavLink>
          <span className={s.message__name}>{message.displayName}</span>
          <span className={s.date}>{convertedDate}</span>

        </div>
        <div className={s.message__body}>
          { message.text }
        </div>
      </div>
  );
};

export default Message;
