import React, {useEffect, useRef} from 'react';
import { fireDB } from "../../API/fire";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Preloader from "../../UI/Preloader/Preloader";
import Message from "./Message/Message";
import NewMessage from "./NewMessage/NewMessage";
import {useParams} from "react-router-dom";
import s from "./dialogs.module.scss";

const Chat = (props) => {
  const {userData} = props;

  const params = useParams()
  const targetUser = params.userId

  const spanRef = useRef()

  useEffect(() => {

  }, [targetUser])



  const firestore = fireDB.firestore()

  const [messages, loadingMessages] = useCollectionData(
    firestore
      .collection('dialogs')
      .doc(userData._id)
      .collection('chatUsers')
      .doc(targetUser)
      .collection('messages')
      .orderBy('createdAt')
      .limitToLast(20)
  )

  if (loadingMessages) {
    return <Preloader />
  }

  const messagesData = messages.map(message => {
    return <Message authorMessageId={message.uid} message={message} authUserID={userData?._id} key={message.createdAt?.seconds}/>
  })

  console.log(messages)

  return (
    <div className={s.chat}>
      <div className={s.messagesData}>
        {targetUser && messagesData}
        <span ref={spanRef}></span>
      </div>
      <div>
        <NewMessage userData={userData} targetUser={targetUser} spanRef={spanRef}/>
      </div>
    </div>
  );
};

export default Chat;