import React, {useEffect} from 'react';
import LoginForm from "./LoginForm";
import s from "./loginform.module.scss"

const Login = (props) => {

  useEffect(() => {
    document.title = "Вход в социальную сеть"
  }, [])

  return (
    <div className={s.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;