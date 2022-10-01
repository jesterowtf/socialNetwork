import {authAPI, profileAPI} from "../API/api";

const SET_AUTH_USER = "SET_AUTH_USER";
const LOGOUT = "LOGOUT";
const ERRORS = "ERRORS";
const SET_AUTH_USER_PROFILE = "SET_AUTH_USER_PROFILE";

const setAuthUserProfile = (profile) => {
  return { type: SET_AUTH_USER_PROFILE, profile }
}

export const setAuthUser = (id) => {
  return {type: SET_AUTH_USER, id}
}

export const logoutAC = () => {
  return {type: LOGOUT}
}

export const addErrors = (error) => {
  return {type: ERRORS, error}
}

let initialState = {
  authUserProfile: {},
  // email: null,
  userId: null,
  isAuth: false,
  getErrors: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        // email: action.data.email,
        userId: action.id,
        isAuth: true
      }

    case SET_AUTH_USER_PROFILE:
      return {
        ...state,
        authUserProfile: action.profile
      }

    case LOGOUT:
      return {
        ...state,
        ...initialState
      }
    case ERRORS:
      return {
        ...state,
        getErrors: action.error
      }

    default:
      return state;
  }
};

const getAuthUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getUserProfile(userId)
      .then(userdata => {
        dispatch(setAuthUserProfile(userdata))
      })
  }
}

export const checkAuth = () => {
  return async (dispatch) => {
    const res = await authAPI.getAuth()

    if (res.code === "ERR_BAD_REQUEST") {
      console.log(res.response.data.errors)
      dispatch(addErrors(res.response.data.errors))
      return;
    }

    localStorage.setItem('token', res.accessToken);
    if (res.user) {
      let {id} = res.user;
      dispatch(setAuthUser(id));
      dispatch(getAuthUserProfile(id));
    }
  }
}

export const registration = (email, password) => {
  return async (dispatch) => {
    const res = await authAPI.registration(email, password)

    if (res.code === "ERR_BAD_REQUEST") {
      console.log(res.response.data.errors)
      dispatch(addErrors(res.response.data.errors))
      return;
    }

    localStorage.setItem('token', res.accessToken);
    dispatch(setAuthUser(res.user.id));
    dispatch(getAuthUserProfile(res.user.id));
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await authAPI.goLogin(email, password)

    if (res.code === "ERR_BAD_REQUEST") {
      console.log(res.response.data.errors)
      dispatch(addErrors(res.response.data.errors))
      return;
    }

    localStorage.setItem('token', res.accessToken)
    dispatch(setAuthUser(res.user.id));
    dispatch(getAuthUserProfile(res.user.id))
  }
}

export const logout = () => {
  return async (dispatch) => {
    await authAPI.goLogout()
    localStorage.removeItem('token')
    dispatch(logoutAC())
  }
}

export default authReducer;
