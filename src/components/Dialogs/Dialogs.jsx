import React, {useEffect} from "react";
import s from "./dialogs.module.scss";
import {useSelector} from "react-redux";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {getAuthUserProfile} from "../../redux/selectors/login-selectors";
import Chat from "./Chat";
import DialogList from "./DialogList/DialogList";
import {useParams} from "react-router-dom";

const Dialogs = (props) => {
  const userData = useSelector(getAuthUserProfile)
  const params = useParams()
  const targetUser = params.userId

  useEffect(() => {
    document.title = `Сообщения | Социальная сеть`
  }, [])

  return (
    <div className={s.dialogs}>
      <h2 className={s.dialogs__title}>Сообщения</h2>

      <div className={s.dialogsBox}>
        <div className={s.dialogsList}>
          <DialogList userData={userData} targetUser={targetUser}/>
        </div>

        { !targetUser ?
          <span className={s.noMessages}>Чат не выбран</span> :
          <Chat userData={userData}/>}
      </div>
    </div>
  );
};

export default Dialogs;
