import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./userInfo.module.scss";
import Preloader from "../../../UI/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getTemporaryAvatarUrl} from "../../../redux/selectors/profile-selectors";
import {
  getUserProfile,
  updateUserProfile, uploadAvatarAndGetUrl,
} from "../../../redux/profile-reducer";
import EditProfile from "./EditProfile";
import changePhotoImg from "../../../assets/images/change.png"
import followImage from "./../../../assets/images/follow.png";
import unfollowImage from "./../../../assets/images/unfollow.png";
import sendMessageImage from "../../../assets/images/sendMessage.png"
import editprofile from "../../../assets/images/editprofile.png"

import {uploadToCloud} from "../../../API/api";
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "../../../redux/users-reducer";

const UserInfo = ({userId, access, userFollowed, authUserId}) => {

  const profile = useSelector(getProfile)
  const temporaryAvatarUrl = useSelector(getTemporaryAvatarUrl)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [visibleButton, setVisibleButton] = useState(true)

  const [getFollow, setFollow] = useState(userFollowed);

  const uploadPhoto = React.createRef();

  useLayoutEffect(() => {
    if (!!userFollowed) {
      setFollow(true)
    } else {
      setFollow(false)
    }

  }, [userFollowed])

  useLayoutEffect(() => {
    if (temporaryAvatarUrl) {
      dispatch(updateUserProfile({
        "_id": userId,
        "avatar": temporaryAvatarUrl
      }))
    }

  }, [dispatch, temporaryAvatarUrl, userId])

  useEffect(() => {
    dispatch(getUserProfile(userId))
  }, [userId, editMode, dispatch])

  const editModeOn = (e) => {
    setEditMode(true)
    setVisibleButton(false)
  }

  const editModeOff = () => {
    setEditMode(false)
    setVisibleButton(true)
  }

  const onFollow = async () => {
    await dispatch(follow(authUserId, userId));
    setFollow(true)
  };

  const onUnfollow = async () => {
    await dispatch(unfollow(authUserId, userId));
    setFollow(false)
  };

  const onPhotoChosen = async (e) => {
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      uploadToCloud(formData, uploadAvatarAndGetUrl, dispatch)
    } catch (e) {
      console.log(e)
    }
  }

  return (<>
      {!profile ? <Preloader/> :
        <div className={s.user__info}>

          {access && visibleButton &&
            <button
              className={s.refreshInfo__button}
              onClick={editModeOn}>
              <img src={editprofile} alt="edit profile" className={s.editprofile__button}/>
               Обновить профиль
            </button> }

          <div className={s.ava__wrapper}>
            {!access && <div className={s.userOptions}>
              <NavLink className={s.sendMessage} to={`/dialogs/${userId}`} >
                <button className={s.follow}>
                  <img
                    src={sendMessageImage}
                    alt={`Написать ${profile?.firstName} ${profile?.secondName}`}
                    className={s.profileButtons}
                  />
                  Написать
                </button>
              </NavLink>
              {getFollow ? (
                <button onClick={onUnfollow} className={s.unfollow}>
                  <img
                    src={unfollowImage}
                    alt={`Удалить ${profile?.firstName} ${profile?.secondName}`}
                    className={s.profileButtons}
                  />
                  Отписаться
                </button>
              ) : (
                <button onClick={onFollow} className={s.follow}>
                  <img
                    src={followImage}
                    alt={`Добавить ${profile?.firstName} ${profile?.secondName}`}
                    className={s.profileButtons}
                  />
                  Подписаться
                </button>
              )}
            </div>
            }
            <img
              src={profile.avatar ||
                "https://placepic.ru/wp-content/uploads/2021/02/image_562610131056464036330.jpg"}
              alt="avatar"
              className={s.ava__img}
            />
            {access && <div className={s.changePhotoDiv}>
              <button className={s.changePhotoImg__button} onClick={(e) => {
                e.preventDefault()
                uploadPhoto.current.click()
              } }>
                <img src={changePhotoImg} alt="changePhoto"/>
              </button>
              <input type="file"
                     accept="image/png, image/gif, image/jpeg"
                     className={s.uploadInput}
                     onChange={onPhotoChosen}
                     ref={uploadPhoto}/>
            </div> }
          </div>
          {!editMode &&
          <div className={s.user__about}>
            <div className={s.name}>
              {profile?.firstName} {profile?.secondName}
              <ProfileStatus userId={userId} access={access}/>
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
          </div>}
          {editMode && <EditProfile profile={profile} editModeOff={editModeOff} userId={userId}/>}
        </div>
      }
    </>
  );
};

export default UserInfo;
