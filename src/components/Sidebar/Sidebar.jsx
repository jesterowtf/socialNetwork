import React from "react";
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";
import s from "./sidebar.module.scss";
import {useSelector} from "react-redux";
import {getAuthUserId} from "../../redux/selectors/login-selectors";
import {getFriendsData} from "../../redux/selectors/sidebar-selectors";

const Sidebar = (props) => {

  const authUserId = useSelector(getAuthUserId)
  const friendsData = useSelector(getFriendsData)

  const checkActive = () => {
    const status = ({ isActive }) =>
      isActive ? `${s.nav__linkActive}` : `${s.nav__link}`;
    return status;
  };

  return (
    <div className={s.sidebar}>
      <nav className={s.nav}>
        {authUserId
          && <NavLink to={`profile/${authUserId}`} className={checkActive()}>
            Мой профиль
          </NavLink>
        }

        <NavLink to="dialogs" className={checkActive()}>
          Сообщения
        </NavLink>
        <NavLink to="feed" className={checkActive()}>
          Новости
        </NavLink>
        <NavLink to="users" className={checkActive()}>
          Люди
        </NavLink>
        <NavLink to="music" className={checkActive()}>
          Музыка
        </NavLink>
        <NavLink to="settings" className={checkActive()}>
          Настройки
        </NavLink>
      </nav>
      <Friends friendsData={friendsData} />
    </div>
  );
};

export default Sidebar;
