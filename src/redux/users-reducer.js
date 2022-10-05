import {userAPI} from '../API/api'
import {checkAuth} from "./auth-reducer";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const TOGGLE_IS_FETCHING= "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING= "TOGGLE_FOLLOWING";

export const followSuccess = (authUserId, targetUserId) => {
  return { type: FOLLOW, authUserId, targetUserId }
}

export const unfollowSuccess = (authUserId, targetUserId) => {
  return { type: UNFOLLOW, authUserId, targetUserId }
}

export const setUsers = (users) => {
  return { type: SET_USERS, users }
}

export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching }
}

export const toggleFollowing = (isFollowing, userId) => {
  return { type: TOGGLE_FOLLOWING, isFollowing, userId }
}

let initialState = {
  users: [],
  isFetching: false,
  followingProgress: []
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u._id === action.authUserId) {
            return {...u, followed: [...u.followed, action.targetUserId] }
          }
          return u;
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u._id === action.authUserId) {
            return {...u, followed: u.followed.filter(u => {
              return u._id !== action.targetUserId
              })}
          }
          return u;
        })
      }
    case SET_USERS:
      return {
        ...state,
        users: action.users
      } 

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case TOGGLE_FOLLOWING:
      return {
        ...state,
        followingProgress: action.isFollowing
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter(id => id !== action.userId)
      };
    default:
      return state;  
  }
};

// THUNKS

export const getUsers = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))
    userAPI.getUsers()
      .then((res) => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(res.data));
        dispatch(checkAuth());
      });
  }
}

export const follow = (authUserId, targetUserId) => {
  return (dispatch) => {
    dispatch(toggleFollowing(true, targetUserId))
    userAPI.followUser(targetUserId)
      .then((res) => {
        dispatch(followSuccess(authUserId, targetUserId))
        dispatch(toggleFollowing(false, targetUserId))
        dispatch(checkAuth());
      })
  }
}

export const unfollow = (authUserId, targetUserId) => {
  return (dispatch) => {
    dispatch(toggleFollowing(true, targetUserId))
    userAPI.unfollowUser(targetUserId)
      .then((res) => {
        dispatch(unfollowSuccess(authUserId, targetUserId))
        dispatch(toggleFollowing(false, targetUserId))
        dispatch(checkAuth());
      })
  }
}

export default usersReducer;
