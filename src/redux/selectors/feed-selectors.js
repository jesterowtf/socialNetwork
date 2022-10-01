export const getPostsData = (state) => {
    return state.feed.posts;
}

export const getIsFetching = (state) => {
  return state.feed.isFetching;
}
