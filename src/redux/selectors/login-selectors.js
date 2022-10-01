export const getIsAuth = (state) => {
  return state.auth.isAuth;
}

export const getAuthUserId = (state) => {
  return state.auth.userId;
}

export const getUserName = (state) => {
  return state.auth.authUserProfile?.firstName;
}

export const getAuthErrors = (state) => {
  return state.auth.getErrors;
}

