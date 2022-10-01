import {postAPI, profileAPI} from "../API/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const GET_IMAGE_URL = "GET_IMAGE_URL";
const GET_USER_POSTS = "GET_USER_POSTS";
const SET_LIKE = "SET_LIKE";
const SET_DISLIKE = "SET_DISLIKE";
const TOGGLE_FOLLOWING= "TOGGLE_FOLLOWING";
const DELETE_POST= "DELETE_POST";

export const addPost = (newPost) => {
  return { type: ADD_POST, newPost }
}

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
}

export const getImageUrl = (imageUrl) => {
  return { type: GET_IMAGE_URL, imageUrl }
}

export const getUserPostsAC = (posts) => {
  return { type: GET_USER_POSTS, posts }
}

export const setLikeAC = (postId) => {
  return { type: SET_LIKE, postId }
}

export const setDislikeAC = (postId) => {
  return { type: SET_DISLIKE, postId }
}

export const deletePostAC = (postId) => {
  return { type: DELETE_POST, postId }
}

let initialState = {
  posts: [],
  newPostImageUrl: '',
  profile: {},
  followingProgress: [],
}

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, {...action.newPost}],
        newPostImageUrl: ''
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case GET_IMAGE_URL:
      return {
        ...state,
        newPostImageUrl: action.imageUrl
      }
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
    case GET_USER_POSTS:
      return {
        ...state,
        posts: [...action.posts.reverse()]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(id => id !== action.postId)
      }

    case TOGGLE_FOLLOWING:
      return {
        ...state,
        followingProgress: action.isFollowing
          ? [...state.followingProgress, action.postId]
          : state.followingProgress.filter(id => id !== action.postId)
      };

    default: 
      return state;
  }
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getUserProfile(userId)
        .then(userdata => {
          dispatch(setUserProfile(userdata))
        })
  }
}

export const setUserProfileStatus = (userId, status) => {
  return (dispatch) => {
     profileAPI.setStatus({"_id": userId, "status": status})
      .then(data => {
        console.log(data)
        dispatch(setUserProfile(data))
      })
  }
}

export const uploadImageAndGetUrl = (image) => {
  return (dispatch) => {
    postAPI.uploadImage(image)
      .then(userdata => {
        dispatch(getImageUrl(userdata))

      })
  }
}

export const getUserPosts =  (id) => {
  return async (dispatch) => {
    await postAPI.getTargetUserPosts(id)
      .then(userdata => {
        dispatch(getUserPostsAC(userdata))
      })
  }
}

export const sendNewPost = (post) => {
  return (dispatch) => {
    console.log(post)
    postAPI.createPost(post)
      .then(userdata => {
        dispatch(addPost(userdata))
      })
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

export const deletePost =  (id) => {
  return (dispatch) => {
    postAPI.deletePost(id).then(() => {
      dispatch(deletePostAC(id))
    })
  }
}

export default profileReducer;