import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./user.module.scss";
import noavatar from "./../../../assets/images/noavatar.png";
import followImage from "./../../../assets/images/follow.png";
import unfollowImage from "./../../../assets/images/unfollow.png";
import sendMessageImage from "../../../assets/images/sendMessage.png";
import share from "../../../assets/images/share.png";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {follow, unfollow} from "../../../redux/users-reducer";
import {getAuthUserId} from "../../../redux/selectors/login-selectors";

const User = (props) => {
  let {userId,
      following,
      firstName,
      secondName,
      photos,
      status,
      followingProgress} = props;

  const [getFollow, setFollow] = useState(false);

  const dispatch = useDispatch()
  const authUserId = useSelector(getAuthUserId)

  useLayoutEffect(() => {
    if (!!following) {
      setFollow(true)
    } else {
      setFollow(false)
    }

  }, [following])

  useEffect(() => {

  }, [getFollow])

  const onFollow = async () => {
    await dispatch(follow(authUserId, userId));
    setFollow(true)
  };

  const onUnfollow = async () => {
    await dispatch(unfollow(authUserId, userId));
    setFollow(false)
  };

  return (
    <div className={s.user}>
      <div className={s.userLeft}>
        <div className={s.avaBox}>
          <img src={photos || noavatar} alt="avatar" className={s.ava}/>
        </div>
      </div>
      <div className={s.userRight}>
        <div>
          <p className={s.name}><span>{firstName} {secondName}</span></p>
          <p className={s.city}><span>{status != null ? status : 'Статус не указан'}</span></p>
        </div>
        <div className={s.followButton}>
          {getFollow ? (
            <button disabled={followingProgress.includes(userId)} onClick={onUnfollow} className={s.unfollow}>
              <img
                src={unfollowImage}
                alt={`Удалить ${firstName} ${secondName}`}
                className={s.profileButtons}
              />
              Отписаться
            </button>
          ) : (
            <button disabled={followingProgress.includes(userId)} onClick={onFollow} className={s.follow}>
              <img
                src={followImage}
                alt="Добавить"
                className={s.profileButtons}
              />
              Подписаться
            </button>
          )}
          <NavLink to={`/profile/${userId}`} className={s.linkButton} >
            <button className={s.goProfile}>
              <img
                src={share}
                alt="Перейти"
                className={s.profileButtons}
              />
              Перейти
            </button>
          </NavLink>
          <NavLink to={`/dialogs/${userId}`} className={s.linkButton}>
            <button className={s.goProfile}>
              <img
                src={sendMessageImage}
                alt="Написать"
                className={s.profileButtons}
              />
              Написать
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default User;
