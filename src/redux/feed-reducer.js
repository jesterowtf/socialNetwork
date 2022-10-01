import {postAPI} from '../API/api'

const GET_POSTS = "GET_POSTS";
const GET_POSTS_IS_FETCHING = "GET_POSTS_IS_FETCHING";
const SET_LIKE = "SET_LIKE";
const SET_DISLIKE = "SET_DISLIKE";

export const getPostsAC = (posts) => {
  return {type: GET_POSTS, posts}
}

export const toggleIsFetching = (isFetching) => {
  return {type: GET_POSTS_IS_FETCHING, isFetching}
}

export const setLikeAC = (postId) => {
  return { type: SET_LIKE, postId }
}

export const setDislikeAC = (postId) => {
  return { type: SET_DISLIKE, postId }
}


let initialState = {
  posts: [],
  isFetching: false
}

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.posts.reverse()]
      };

    case GET_POSTS_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case SET_LIKE:
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p._id === action.postId) {
            return {...p,
              likesCount: p.likesCount + 1,
            }
          }
          return p;
        })
      }
    case SET_DISLIKE:
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p._id === action.postId) {
            return {
              ...p,
              likesCount: p.likesCount - 1,
            }
          }
          return p;
        })
      }

    default:
      return state;
  }
};

// THUNKS

export const getPosts = (friends) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    if (friends) {
      postAPI.getMyFriendsPosts()
        .then((res) => {
          dispatch(toggleIsFetching(false));
          dispatch(getPostsAC(res))
        });
    } else {
      postAPI.getAllPosts()
        .then((res) => {
          dispatch(toggleIsFetching(false));
          dispatch(getPostsAC(res))
        });
    }
  }
}


export const setLike =  (id) => {
  return (dispatch) => {
    postAPI.like(id).then(() => {
      dispatch(setLikeAC(id))
    })

  }
}

export const setDislike =  (id) => {
  return (dispatch) => {
    postAPI.dislike(id).then(() => {
      dispatch(setDislikeAC(id))
    })
  }
}

export default feedReducer;
