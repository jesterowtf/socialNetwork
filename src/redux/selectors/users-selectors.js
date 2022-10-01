export const getUsersData = (state) => {
    return state.usersPage.users;
}

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
}

export const getFollowingProgress = (state) => {
  return state.usersPage.followingProgress;
}

