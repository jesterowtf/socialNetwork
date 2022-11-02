import {profileAPI} from "../API/api";

const GET_DIALOGS_USER_INFO = "GET_DIALOGS_USER_INFO";

export const getDialogsUserInfoAC = (user) => {
  return { type: GET_DIALOGS_USER_INFO, user }
}

let initialState = {
  dialogsProfileInfos: [],
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIALOGS_USER_INFO:
      return {
        ...state,
        dialogsProfileInfos: action.user
      }
    default:
      return state;  
  }

};


export const getDialogsUserInfo = (id) => {
  return (dispatch) => {
    if (!id ) {
      dispatch(getDialogsUserInfoAC([]))
      return
    }
    profileAPI.getUserProfile(id)
      .then((res) => {
        dispatch(getDialogsUserInfoAC(res));
      });
  }
}


export default dialogsReducer;
