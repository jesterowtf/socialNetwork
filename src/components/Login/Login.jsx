import React from 'react';
import LoginForm from "./LoginForm";
import s from "./loginform.module.scss"

const Login = (props) => {
  return (
    <div className={s.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;