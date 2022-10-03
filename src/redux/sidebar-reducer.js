import {sidebarAPI} from "../API/api";

const GET_FRIENDS = "GET_FRIENDS";

export const getFriendsAC = (friends) => {
  return { type: GET_FRIENDS, friends }
}

let initialState = {
    friends: [],
  }

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FRIENDS:
        return {
          ...state,
          friends: action.friends
        }

      default:
        return state;
    }
}


export const getFriends = () => {
  return (dispatch) => {
    sidebarAPI.getFriends()
      .then(friends => {
        dispatch(getFriendsAC(friends))
      })
  }
}


export default sidebarReducer;