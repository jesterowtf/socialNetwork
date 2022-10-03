import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import s from "./loginform.module.scss";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthErrors, getIsAuth} from "../../redux/selectors/login-selectors";
import {login, registration} from "../../redux/auth-reducer";

const LoginForm = (props) => {
  const isAuth = useSelector(getIsAuth)
  const apiErrors = useSelector(getAuthErrors)

  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const navigate = useNavigate()

  const goLogin = () => {
    return handleSubmit(async (data) => {
        await dispatch(login(
          data.email,
          data.password,
        ))
        reset()
      }
    )()
  }

  const goRegistration = () => {
    return handleSubmit(async (data) => {
        await dispatch(registration(
          data.email,
          data.password
        ))
        reset()
      }
    )()
  }

  useEffect(() => {
    if (isAuth) {
      navigate(-1)
    }
  }, [isAuth, navigate])

  return (<div>
    <form className={s.loginForm}>

      <div className={s.loginFormDiv}>
        <span className={s.inputsName}>Email</span>
        <input {...register('email', {
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })} type="text" placeholder='Введите email' className={s.inputs}/>
        {errors.email && <span
          className={s.errors}>{(errors.email?.type === 'required' && "Введите email") || (errors.email?.type === 'pattern' && "Некорректный email")}</span>}
      </div>

      <div className={s.loginFormDiv}>
        <span className={s.inputsName}>Пароль</span>
        <input {...register('password', {required: true, minLength: 4, maxLength: 15})} type="text"
               placeholder='Введите пароль'
               className={s.inputs}/>
        {errors.password?.type === 'required' &&
          <span className={s.errors}>{errors.password?.type === 'required' && "Введите пароль"}</span>}
        {errors.password?.type === 'minLength' &&
          <span className={s.errors}>{errors.password?.type === 'minLength' && "Минимальный пароль 4 символа"}</span>}
        {apiErrors && <span className={s.errors}>{apiErrors}</span> }
      </div>

    </form>
    <button onClick={goLogin} className={s.enterButton}>Войти
    </button>
    <button onClick={goRegistration} className={s.enterButton}>Регистрация</button>
  </div>);
};

export default LoginForm;