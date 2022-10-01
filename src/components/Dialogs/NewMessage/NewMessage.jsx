import React from "react";
import s from "./newmessage.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addMessage} from "../../../redux/dialogs-reducer";

const NewMessage = (props) => {
  const dispatch = useDispatch()

  const {register, handleSubmit, reset} = useForm();

  const onSubmit = (data) => {
    console.log(data)
    dispatch(addMessage(data.message))
    reset()
  }

  return (
      <div className={s.newMessageBox}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.newMessageForm}>
          <div>
            <textarea {...register('message', {
              required: true,
              minLength: 1,
              maxLength: 300
            })} placeholder='Напишите сообщение' className={s.newMessage}/>
          </div>
          <button type='submit' className={s.sendMessage}>Отправить</button>
        </form>
      </div>
       
  );
};

export default NewMessage;
