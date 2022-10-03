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

const UserInfo = ({userId, access}) => {

  const profile = useSelector(getProfile)
  const temporaryAvatarUrl = useSelector(getTemporaryAvatarUrl)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [visibleButton, setVisibleButton] = useState(true)

  const uploadPhoto = React.createRef();

  useEffect(() => {
    dispatch(getUserProfile(userId))
  }, [userId, editMode])

  useLayoutEffect(() => {
    if (temporaryAvatarUrl) {
      dispatch(updateUserProfile({
        "_id": userId,
        "avatar": temporaryAvatarUrl
      }))
    }

  }, [temporaryAvatarUrl])

  const editModeOn = (e) => {
    setEditMode(true)
    setVisibleButton(false)
  }

  const editModeOff = () => {
    setEditMode(false)
    setVisibleButton(true)
  }

  const onPhotoChosen = async (e) => {
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      dispatch(uploadAvatarAndGetUrl(formData))
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
               Обновить информацию
            </button> }

          <div className={s.ava__wrapper}>
            <img
              src={`${process.env.REACT_APP_STATIC_FILES_URL}${profile.avatar}` ||
                "https://placepic.ru/wp-content/uploads/2021/02/image_562610131056464036330.jpg"}
              alt="avatar"
              className={s.ava__img}
            />
            <div className={s.changePhotoDiv}>
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
            </div>
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
