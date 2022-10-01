import React, {useEffect} from "react";
import s from "./header.module.scss";
import logo from "./../../assets/images/logo6.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getUserName} from "../../redux/selectors/login-selectors";
import {logout} from "../../redux/auth-reducer";
import ThemeToggler from "./ThemeToggler/ThemeToggler";

const Header = (props) => {

  const auth = useSelector(getIsAuth)

  const navigate = useNavigate()
  const userName = useSelector(getUserName)
  const dispatch = useDispatch()

  const loginOut = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [auth])

  return (
    <>
      <div className={s.header}>
        <div className={s.logoDiv}>
          <img src={logo} alt="logo" className={s.logo}/>
          <div className={s.sitename}>Социальная сеть</div>
        </div>
        <div className={s.rightSide}>
          <div className={s.login}>
            {auth ? <NavLink className={s.loginButton} onClick={loginOut} to={'/login'}>{userName} | Выйти</NavLink> :
              <NavLink className={s.loginButton} to={'/login'}> Войти </NavLink>}
          </div>
          <ThemeToggler />
        </div>
      </div>
    </>
  )
    ;
};

export default Header;
