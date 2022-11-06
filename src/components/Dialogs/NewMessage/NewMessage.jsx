import React, {useEffect} from "react";
import s from "./newmessage.module.scss";
import {useForm} from "react-hook-form";
import { fireDB } from "../../../API/fire";
import firebase from "firebase/compat/app";
import {useDispatch, useSelector} from "react-redux";
import {getDialogsUserInfo} from "../../../redux/dialogs-reducer";
import {useParams} from "react-router-dom";

const NewMessage = (props) => {

  const { userData, spanRef } = props;
  const targetUserData = useSelector(state => state.dialogsPage.dialogsProfileInfos)

  const params = useParams()
  const dispatch = useDispatch()

  const targetUser = params.userId

  const firestore = fireDB.firestore()

  useEffect(() => {
    if (targetUser) {
      dispatch(getDialogsUserInfo(targetUser))
    }
    spanRef.current.scrollIntoView({behavior: 'smooth'})
    return () => dispatch(getDialogsUserInfo(''))

  }, [spanRef, dispatch, targetUser])

  useEffect(() => {
    document.title = `Чат с ${targetUserData?.firstName} ${targetUserData?.secondName} | Социальная сеть`
  }, [targetUserData?.firstName, targetUserData?.secondName])


  const {register, handleSubmit, reset} = useForm();

  const onSubmit = async (data) => {

    await firestore
      .collection('dialogs')
      .doc(userData._id)
      .collection('chatUsers')
      .doc(targetUserData._id)
      .collection('messages')
      .add({
        uid: userData?._id,
        displayName: userData?.firstName,
        photoURL: userData?.avatar || 'https://placepic.ru/wp-content/uploads/2021/02/image_562610131056464036330.jpg',
        text: data.message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

    await firestore
      .collection('dialogs')
      .doc(userData._id)
      .collection('chatUsers')
      .doc(targetUserData._id)
      .set({
        uid: targetUserData._id,
        avatar: targetUserData?.avatar,
        firstName: targetUserData?.firstName,
        secondName: targetUserData?.secondName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

    await firestore
      .collection('dialogs')
      .doc(targetUserData._id)
      .collection('chatUsers')
      .doc(userData._id)
      .collection('messages')
      .add({
        uid: userData?._id,
        displayName: userData?.firstName,
        photoURL: userData?.avatar || 'https://placepic.ru/wp-content/uploads/2021/02/image_562610131056464036330.jpg',
        text: data.message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

    await firestore
      .collection('dialogs')
      .doc(targetUserData._id)
      .collection('chatUsers')
      .doc(userData._id)
      .set({
        uid: userData._id,
        avatar: userData?.avatar,
        firstName: userData?.firstName,
        secondName: userData?.secondName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    reset()
    spanRef.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
      <div className={s.newMessageBox}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.newMessageForm}>
          <div className={s.newMessageBox}>
            <textarea {...register('message', {
              required: true,
              minLength: 1,
              maxLength: 300
            })} placeholder='Напишите сообщение' className={s.newMessage}/>
            <button type='submit' className={s.sendMessage}>Отправить</button>
          </div>
        </form>
      </div>
       
  );
};

export default NewMessage;
