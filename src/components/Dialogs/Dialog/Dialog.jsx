import React from "react";
import { NavLink } from "react-router-dom";
import s from "./dialog.module.scss";

const Dialog = (props) => {

  let { src, id, name } = props;

  return (
    <NavLink to={`/dialogs/${id}`} className={s.navlink}>
      <div className={s.dialogsList__item}>
        <img
          src={src}
          alt="avatar"
          className={s.itemAva}
        />
        <span> {name} </span>
      </div>
    </NavLink>
  );
};

export default Dialog;
