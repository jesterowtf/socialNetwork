import React, {useLayoutEffect} from "react";
import s from "./friends.module.scss";
import Friend from "./Friend/Friend";
import {useDispatch, useSelector} from "react-redux";
import {getFriendsData} from "../../../redux/selectors/sidebar-selectors";
import {getFriends} from "../../../redux/sidebar-reducer";
import {getIsAuth} from "../../../redux/selectors/login-selectors";

const Friends = ({followedUsers}) => {
  const friendsData = useSelector(getFriendsData)
  const isAuth = useSelector(getIsAuth)
  const dispatch = useDispatch()


  useLayoutEffect(() => {
    if (isAuth) {
      dispatch(getFriends());
    }
  }, [dispatch, followedUsers, isAuth])

  return (
    <div className={s.friends}>
        <h3 className={s.friendTitle}>Друзья:</h3>
        <div className={s.friendsItems}>

          {!friendsData[0] ?
            <span className={s.nofriends}>в друзьях никого нет..</span> :
            friendsData.map((friend) => {
            return  <Friend key={friend._id}
                            firstName={friend.firstName}
                            secondName={friend.secondName}
                            avatar={friend.avatar}
                            id={friend._id}/>
          })}
        </div>
      </div>
  );
};

export default Friends;
