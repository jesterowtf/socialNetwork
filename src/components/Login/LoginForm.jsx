import React, { useEffect} from 'react';
import {useForm} from "react-hook-form";
import s from "./loginform.module.scss";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthErrors, getAuthUserId, getIsAuth} from "../../redux/selectors/login-selectors";
import {login, registration} from "../../redux/auth-reducer";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const LoginForm = () => {
  const isAuth = useSelector(getIsAuth)
  const authUserId = useSelector(getAuthUserId)

  const auth = getAuth()

  const loginFirebase = async (email, password) => {
    await signInWithEmailAndPassword(auth,email, password)
      .then(response => console.log(response))
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
        } else {
          console.log(errorMessage);
        }
        console.log(`error:`, error);
      })
  }

  const registerFirebase = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(response => console.log(response))
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
        } else {
          console.log(errorMessage);
        }
        console.log(`error:`, error);
      })
  }

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
        await loginFirebase(data.email, data.password)
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
      await registerFirebase(data.email, data.password)
        reset()
      }
    )()
  }

  useEffect(() => {
    if (isAuth) {
      navigate(`/profile/${authUserId}`)
    }
  }, [authUserId, isAuth, navigate])

  return (
    <div>
      <span className={s.test}>?????? ?????????? : test@test.ru tttest</span>
      <div className={s.loginElements}>
        <form className={s.loginForm}>

          <div className={s.loginFormDiv}>
            <span className={s.inputsName}>Email</span>
            <input {...register('email', {
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })} type="text" placeholder='?????????????? email' className={s.inputs}/>
            {errors.email && <span
              className={s.errors}>{(errors.email?.type === 'required' && "?????????????? email") || (errors.email?.type === 'pattern' && "???????????????????????? email")}</span>}
          </div>

          <div className={s.loginFormDiv}>
            <span className={s.inputsName}>????????????</span>
            <input {...register('password', {required: true, minLength: 6, maxLength: 15})} type="text"
                   placeholder='?????????????? ????????????'
                   className={s.inputs}/>
            {errors.password?.type === 'required' &&
              <span className={s.errors}>{errors.password?.type === 'required' && "?????????????? ????????????"}</span>}
            {errors.password?.type === 'minLength' &&
              <span className={s.errors}>{errors.password?.type === 'minLength' && "?????????????????????? ???????????? 6 ????????????????"}</span>}
            {apiErrors && <span className={s.errors}>{apiErrors}</span> }
          </div>

        </form>
        <button onClick={goLogin} className={s.enterButton}>?????????? </button>
        <button onClick={goRegistration} className={s.enterButton}>??????????????????????</button>
      </div>
    </div>)
};

export default LoginForm;