import {postAPI, profileAPI} from "../API/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const GET_IMAGE_URL = "GET_IMAGE_URL";
const GET_AVATAR_URL = "GET_AVATAR_URL";
const GET_USER_POSTS = "GET_USER_POSTS";
const SET_LIKE = "SET_LIKE";
const SET_DISLIKE = "SET_DISLIKE";
const TOGGLE_FOLLOWING= "TOGGLE_FOLLOWING";
const DELETE_POST= "DELETE_POST";
const EDIT_POST= "EDIT_POST";

export const addPost = (newPost) => {
  return { type: ADD_POST, newPost }
}

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
}

export const getImageUrl = (imageUrl) => {
  return { type: GET_IMAGE_URL, imageUrl }
}

export const getAvatarUrl = (imageUrl) => {
  return { type: GET_AVATAR_URL, imageUrl }
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

export const editPostAC = (postId, editedPost) => {
  return { type: EDIT_POST, postId, editedPost }
}

let initialState = {
  posts: [],
  temporaryImageUrl: '',
  temporaryAvatarUrl: '',
  profile: {},
  followingProgress: [],
}

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, {...action.newPost}],
        temporaryImageUrl: ''
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
        temporaryAvatarUrl: ''
      }

    case GET_IMAGE_URL:
      return {
        ...state,
        temporaryImageUrl: action.imageUrl
      }

    case GET_AVATAR_URL:
      return {
        ...state,
        temporaryAvatarUrl: action.imageUrl
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
        posts: [...action.posts?.reverse()]
      }

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p._id === action.postId) {
            return {
              ...p,
              ...action.editedPost
            }
          }
          return p;
        }),
        temporaryImageUrl: ''
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
        dispatch(setUserProfile(data))
      })
  }
}

export const updateUserProfile = (userdata) => {
  return (dispatch) => {
    console.log(userdata)
    profileAPI.updateUser(userdata)
      .then(data => {
        dispatch(setUserProfile(data))
        dispatch(getImageUrl(''))
      })
  }
}

export const uploadImageAndGetUrl = (image) => {
  return (dispatch) => {
    postAPI.uploadImage(image)
      .then(imageUrl => {
        dispatch(getImageUrl(imageUrl))
      })
  }
}

export const uploadAvatarAndGetUrl = (image) => {
  return (dispatch) => {
    postAPI.uploadImage(image)
      .then(imageUrl => {
        dispatch(getAvatarUrl(imageUrl))
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
      .then(postdata => {
        dispatch(addPost(postdata))
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

export const updatePost = (newPostData) => {
  return (dispatch) => {
    postAPI.updatePost(newPostData).then(postdata => {
      console.log(postdata)
      dispatch(editPostAC(postdata._id, postdata))
      dispatch(getImageUrl(''))
    })
  }
}

export const deletePost =  (postId) => {
  return (dispatch) => {
    postAPI.deletePost(postId).then(() => {
      dispatch(deletePostAC(postId))
    })
  }
}

export default profileReducer;