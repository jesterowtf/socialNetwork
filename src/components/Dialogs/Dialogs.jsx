import React from "react";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import s from "./dialogs.module.scss";
import NewMessage from "./NewMessage/NewMessage";
import {useSelector} from "react-redux";
import {getDialogsData, getMessagesData} from "../../redux/selectors/dialogs-selectors";

const Dialogs = (props) => {

  const dialogsData = useSelector(getDialogsData)
  const messagesData = useSelector(getMessagesData)

  let dialogsElements = dialogsData.map((d, i) => <Dialog src={d.src} id={d.id} name={d.name} key={i}/> );
  let messagesElements = messagesData.map((m, i) => <Message message={m.message} key={i}/> );

   return (
    <div className={s.dialogs}>
      <h2 className={s.dialogs__title}>Сообщения</h2>
      <div className={s.dialogsBox}>
        <div className={s.dialogsList}>
          { dialogsElements }
        </div>
        <div className={s.dialogsItems}>
          <div className={s.messages}>
            { messagesElements }
          </div>
          <NewMessage />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
