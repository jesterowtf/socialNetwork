import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";
import s from "./sidebar.module.scss";
import {useSelector} from "react-redux";
import {getAuthUserId} from "../../redux/selectors/login-selectors";
import {getFollowedUsers} from "../../redux/selectors/profile-selectors";
import profileIcon from "../../assets/images/profileIcon.png"
import messages from "../../assets/images/messages.png"
import news from "../../assets/images/news.png"
import users from "../../assets/images/users.png"

const Sidebar = (props) => {
  const authUserId = useSelector(getAuthUserId)
  const followedUsers = useSelector(getFollowedUsers)

  useEffect(() => {
    console.log(!!authUserId)
  }, [authUserId])

  const checkActive = () => {
    const status = ({isActive}) =>
      isActive ? `${s.nav__linkActive}` : `${s.nav__link}`;
    return status;
  };

  return (
    <div className={s.sidebar}>
      {!!authUserId ? <div>
          <nav className={s.nav}>
            <NavLink to={`profile/${authUserId}`} className={checkActive()}>
              <img src={profileIcon} alt="profile" className={s.menuIcon}/>
              Мой профиль
            </NavLink>
            <NavLink to="dialogs" className={checkActive()}>
              <img src={messages} alt="profile" className={s.menuIcon}/>
              Сообщения
            </NavLink>
            <NavLink to="feed" className={checkActive()}>
              <img src={news} alt="profile" className={s.menuIcon}/>
              Новости
            </NavLink>
            <NavLink to="users" className={checkActive()}>
              <img src={users} alt="profile" className={s.menuIcon}/>
              Люди
            </NavLink>
          </nav>
          <Friends authUserId={authUserId} followedUsers={followedUsers}/>
        </div> :
        <span className={s.sidebarMenuText}>Чтобы увидеть меню, необходимо авторизоваться</span>}
    </div>
  )
};

export default Sidebar;
