import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import s from "./userInfo.module.scss";
import Preloader from "../../../UI/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import {useDispatch, useSelector} from "react-redux";
import {getProfile } from "../../../redux/selectors/profile-selectors";
import {getUserProfile} from "../../../redux/profile-reducer";

const UserInfo = (props) => {
  const profile = useSelector(getProfile)


  const dispatch = useDispatch()

  let params = useParams();
  let userId = params.userId;

  useEffect(() => {
    dispatch(getUserProfile(userId))
  }, [userId])

  return (<>
      {!profile ? <Preloader/> :
        <div className={s.user__info}>

          <div className={s.ava__wrapper}>
            <img
              src={profile.avatar || "https://placepic.ru/wp-content/uploads/2021/02/image_562610131056464036330.jpg"}
              alt="avatar"
              className={s.ava__img}
            />
          </div>
          <div className={s.user__about}>
            <div className={s.name}>
              {profile?.firstName} {profile?.secondName}
              <ProfileStatus userId={userId}/>
            </div>
            <div className={s.profileInfo}>
              <div className={s.infoBlock}>
                <span className={s.spanInfoLeft}>Обо мне: </span>
                <span className={s.spanInfoRight}>{profile?.about} </span>
              </div>
              <div className={s.infoBlock}>
                <span className={s.spanInfoLeft}>Возраст: </span>
                <span className={s.spanInfoRight}>{profile?.age} </span>
              </div>
              <div className={s.infoBlock}>
                <span className={s.spanInfoLeft}>Контакты: </span>
                <span className={s.spanInfoRight}>
                  <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
                </span>
              </div>

            </div>

          </div>
        </div>
      }
    </>
  );
};

export default UserInfo;
