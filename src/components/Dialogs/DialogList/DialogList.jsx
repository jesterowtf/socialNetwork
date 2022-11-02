import React from "react";
import s from "./dialoglist.module.scss";
import {useCollectionData } from "react-firebase-hooks/firestore";
import { fireDB } from "../../../API/fire";
import Preloader from "../../../UI/Preloader/Preloader";
import {NavLink} from "react-router-dom";

const DialogList = (props) => {

  const {userData, targetUser} = props;

  const firestore = fireDB.firestore()

  const [dialogs, loadingDialogs] = useCollectionData(
    firestore
      .collection("dialogs")
      .doc(userData._id)
      .collection("chatUsers")
      .orderBy('createdAt')

  )
  if (loadingDialogs) {
    return <Preloader/>
  }

  console.log(dialogs)

  return (

    <div className={s.dialogsItems}>
      {dialogs.map(d => {

        const isActive = d.uid === targetUser

        const dialogsClass = isActive ? `${s.navlink} ${s.active}` : `${s.navlink}`

        return  <NavLink to={`/dialogs/${d.uid}`} className={dialogsClass} key={d.uid}>
          <div className={s.dialogsList__item}>
            <img
              src={d.avatar}
              alt="avatar"
              className={s.itemAva}
            />
            <span> {d.firstName}   </span>
          </div>
        </NavLink>
      }) }
      {!dialogs[0] && <span className={s.noDialogs}>Диалогов нет</span>}
    </div>
  );

};

export default DialogList;
