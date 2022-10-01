export const getProfile = (state) => {
  return state.profilePage.profile;
}

export const getStatus = (state) => {
  return state.profilePage.profile?.status;
}

export const getPosts = (state) => {
  return state.profilePage.posts;
}

export const getImagePost = (state) => {
  return state.profilePage.newPostImageUrl;
}

export const getFollowedUsers = (state) => {
  return state.profilePage.profile?.followed;
}
