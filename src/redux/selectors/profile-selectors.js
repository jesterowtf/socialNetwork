export const getProfile = (state) => {
  return state.profilePage.profile;
}

export const getStatus = (state) => {
  return state.profilePage.profile?.status;
}

export const getPosts = (state) => {
  return state.profilePage.posts;
}

export const getTemporaryImageUrl = (state) => {
  return state.profilePage.temporaryImageUrl;
}
export const getTemporaryAvatarUrl = (state) => {
  return state.profilePage.temporaryAvatarUrl;
}

export const getFollowedUsers = (state) => {
  return state.auth.authUserProfile.followed;
}
