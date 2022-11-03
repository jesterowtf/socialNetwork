import * as axios from "axios";

export let instance = axios.create({
  baseURL: `${process.env.REACT_APP_STATIC_FILES_URL}/`,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  }
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

instance.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      console.log(`error.response.status === 401`)
      const response = await axios.get(`${process.env.REACT_APP_STATIC_FILES_URL}/api/refresh`, {withCredentials: true})
      console.log(`error.response.status`, response)
      localStorage.setItem('token', response.data.accessToken);
      console.log(response.data.accessToken)
      return instance.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error;
})

export const userAPI = {
  getUsers() {
    return instance
      .get(`api/users`)
      .then(response => response)
  },
  unfollowUser(user) {
    return instance.post(`api/unfollow`, {user} )
      .then(response => response.data)
  },
  followUser(user) {
    return instance.post(`api/follow`, {user} )
      .then(response => response.data)
  },
}

export const authAPI = {
  getAuth() {
    return instance.get('api/refresh')
      .then(response => {
      return response.data
    })
  },

  registration(email, password) {
    return instance.post(`api/registration`, {
      email,
      password,
    })
      .then(response => {
        return response.data
      })
      .catch((reject) => {
        return reject;
      })
  },

  goLogin(email, password) {
    return instance.post(`api/login`, {email, password})
      .then((response) => {
        return response.data
      })
      .catch((reject) => {
        return reject;
      })

  },
  goLogout() {
    return instance.post(`api/logout`).then(response => response.data)
  }
}

export const sidebarAPI = {
  getFriends() {
    return instance.get(`api/friends`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },
}

export const profileAPI = {
  getUserProfile(id) {
    return instance.get(`api/profile/${id}`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  setStatus(user) {
    return instance.put(`api/users`, JSON.stringify(user))
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  updateUser(user) {
    return instance.put(`api/users`, JSON.stringify(user))
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  }

}

export const uploadToCloud = (data, func, dispatch) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.imageban.ru/v1");
  xhr.onload = function() {
    dispatch(func(JSON.parse(xhr.responseText).data.link))
  }
  xhr.setRequestHeader('Authorization', 'TOKEN 7JdqH9BQ6yZRqQXvya3p');
  xhr.send(data);
}

export const postAPI = {
  uploadImage(image) {
    return instance.post(`api/upload`, {"image": image})
      .then(response => {
        return response.data
      })
      .catch((reject) => {
        return reject;
      })
  },

  createPost(post) {
    console.log(post)
    return instance.post(`api/posts`,{post})
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  getAllPosts() {
    return instance.get(`api/posts`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  getTargetUserPosts(id) {
    return instance.get(`api/myposts/${id}`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  getMyFriendsPosts() {
    return instance.get(`api/postsFriends`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  updatePost(post) {
    return instance.put(`api/posts`, {post})
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  like(id) {
    return instance.put(`api/likesup`, {id})
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  dislike(id) {
    return instance.put(`api/likesdown`, {id})
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  },

  deletePost(id) {
    return instance.delete(`api/posts/${id}`)
      .then(response => response.data)
      .catch((reject) => {
        return reject;
      })
  }

}