import React, {useState} from 'react';
import s from "./userInfo.module.scss";
import {useDispatch} from "react-redux";
import {updateUserProfile} from "../../../redux/profile-reducer";
import {useForm} from "react-hook-form";

const EditProfile = ({profile, editModeOff, userId}) => {
  const [firstName, setFirstName] = useState(profile?.firstName || '')
  const [secondName, setSecondName] = useState(profile?.secondName || '')
  const [aboutMe, setAboutMe] = useState(profile?.about || '')
  const [age, setAge] = useState(profile?.age || '')
  const [email, setEmail] = useState(profile?.email || '')

  const dispatch = useDispatch()

  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  const onSubmit = async (data) => {
    data._id = userId
    dispatch(updateUserProfile({
      "_id": data._id,
      "firstName": data.firstName,
      "secondName": data.secondName,
      "about": data.aboutMe,
      "age": data.age,
      "email": data.email,
    }))
    reset()
    editModeOff()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.user__edit}>
          <div className={s.inputDiv}>
            <input {...register('firstName', {
              minLength: 2,
              maxLength: 20
            })} className={s.refreshInfo__input}
                   value={firstName}
                   onChange={(e) => setFirstName(e.target.value)}
                   type="text"
                   placeholder="Введите имя"/>
            {errors.firstName && <span
              className={s.errors}>
            {(errors.firstName?.type === 'minLength' && "Минимальная длина 2 символа") ||
              (errors.firstName?.type === 'maxLength' && "Минимальная длина 20 символов")}
          </span>}
          </div>


          <div className={s.inputDiv}>
            <input {...register('secondName', {
              minLength: 2,
              maxLength: 20
            })} className={s.refreshInfo__input}
                   type="text"
                   value={secondName}
                   onChange={(e) => setSecondName(e.target.value)}
                   placeholder="Введите фамилию"/>
            {errors.secondName && <span
              className={s.errors}>
            {(errors.secondName?.type === 'minLength' && "Минимальная длина 2 символа") ||
              (errors.secondName?.type === 'maxLength' && "Минимальная длина 20 символов")}
          </span>}
          </div>


          <div className={s.inputDiv}>
            <textarea {...register('aboutMe', {
              minLength: 2,
              maxLength: 500
            })} className={s.refreshInfo__aboutMe}
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      placeholder="Напишите что-нибудь о себе"/>
          </div>
          {errors.aboutMe && <span
            className={s.errors}>
            {(errors.aboutMe?.type === 'minLength' && "Минимальная длина 2 символа") ||
              (errors.aboutMe?.type === 'maxLength' && "Минимальная длина 500 символов")}
          </span>}

          <div className={s.inputDiv}>
            <input {...register('age', {
              minLength: 2,
              maxLength: 2
            })} className={s.refreshInfo__input}
                   type="number"
                   value={age}
                   onChange={(e) => setAge(e.target.value)}
                   placeholder="Введите ваш возраст"/>
          </div>
          {errors.age && <span
            className={s.errors}>
            {(errors.age?.type === 'minLength' && "Минимальный возраст 10 лет") ||
              (errors.age?.type === 'maxLength' && "Минимальный возраст 99 лет")}
          </span>}


          <div className={s.inputDiv}>
            <input {...register('email', {
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })} className={s.refreshInfo__input}
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Введите ваш email"/>
            {errors.email && <span
              className={s.errors}>
            {(errors.email?.type === 'pattern' && "Некорректный email адрес")}
          </span>}
          </div>

          <button className={s.refreshInfo__formButton} type='submit'>Сохранить информацию</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;