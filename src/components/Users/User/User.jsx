import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./user.module.scss";
import noavatar from "./../../../assets/images/noavatar.png";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {follow, unfollow} from "../../../redux/users-reducer";
import {getAuthUserId} from "../../../redux/selectors/login-selectors";

const User = (props) => {
  let {userId,
      following,
      firstname,
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

  const onFollow =async () => {
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
          <img src={photos || noavatar} alt="ava" className={s.ava}/>
        </div>
      </div>
      <div className={s.userRight}>
        <div>
          <p className={s.name}><span>{firstname} {secondName}</span></p>
          <p className={s.city}><span>{status != null ? status : 'Статус не указан'}</span></p>
        </div>
        <div className={s.followButton}>
          {getFollow ? (
            <button disabled={followingProgress.includes(userId)} onClick={onUnfollow} className={s.unfollow}>
              Отписаться
            </button>
          ) : (
            <button disabled={followingProgress.includes(userId)} onClick={onFollow} className={s.follow}>
              Подписаться
            </button>
          )}
          <NavLink to={`/profile/${userId}`}>
            <button className={s.goProfile}>
              Перейти
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default User;
