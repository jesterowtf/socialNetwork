import * as axios from "axios";

export let instance = axios.create({
  baseURL: 'https://social-network-backend-lemon.vercel.app/',
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
      const response = await axios.get(`https://social-network-backend-lemon.vercel.app/auth/refresh`, {withCredentials: true})
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
    return instance.get('auth/refresh').then(response => {
      return response.data
    })
  },

  registration(email, password) {
    return instance.post(`auth/registration`, {
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
    return instance.post(`auth/login`, {email, password})
      .then((response) => {
        return response.data
      })
      .catch((reject) => {
        return reject;
      })

  },
  goLogout() {
    return instance.post(`auth/logout`).then(response => response.data)
  }
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
  }

}

export const postAPI = {
  uploadImage(image) {
    return instance.post(`upload`, image)
      .then(response => response.data.url)
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

  getOnePost(id) {
    return instance.get(`api/posts/${id}`)
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