import React from "react";
import s from "./message.module.scss";

const Message = (props) => {

  let { message } = props;
  return (
      <div className={s.message}>
        { message }
      </div>
       
  );
};

export default Message;
