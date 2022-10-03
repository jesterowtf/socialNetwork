import React, { useEffect, useState} from 'react';
import s from "./userInfo.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfileStatus} from "../../../redux/profile-reducer";
import {getStatus} from "../../../redux/selectors/profile-selectors";

const ProfileStatus = (props) => {
  const { userId, access } = props;

  const status = useSelector(getStatus)

  const [newStatus, setStatus] = useState(status || '')
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setStatus(status)
  }, [status])

  const editModeOn = () => {
    setEditMode(true)
  }

  const editModeOff = () => {
    setEditMode(false)
    dispatch(setUserProfileStatus(userId, newStatus))
  }

  const changeStatus = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {
        !editMode
        ?
        <span className={s.status} onDoubleClick={() => {
          if (access) {
            editModeOn()
          }
        }}>{status}</span>
        :
        <input className={s.statusInput} autoFocus={true} onBlur={editModeOff} onChange={changeStatus} value={newStatus}
               type='text'/>
      }
    </div>
  );
};

export default ProfileStatus;