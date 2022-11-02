import React, {useEffect, useLayoutEffect} from "react";
import s from "./myPosts.module.scss";
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../../redux/selectors/profile-selectors";
import {getUserPosts, setDislike, setLike, updateUserProfile} from "../../../redux/profile-reducer";
import {getAuthUserId} from "../../../redux/selectors/login-selectors";

const MyPosts = ({userId, access}) => {
  const dispatch = useDispatch()

  const authUserId = useSelector(getAuthUserId)

  useLayoutEffect(() => {
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  const posts = useSelector(getPosts)

  useEffect(() => {

  }, [posts])
    

  return (
    <div>
      {access && <div className={s.newPost}>
        <h2 className={s.newPost__title}>Новый пост</h2>
         <NewPost/>

      </div> }
      <div className={s.myPosts}>
        <h2 className={s.myPosts__title}>Мои посты</h2>
        {posts.map(  (post, i) => {
          const postWasLiked =  post.likedAccounts.find(el => el === authUserId);

          return <Post likes={post.likesCount}
                       text={post.text}
                       title={post.title}
                       authorImage={post.user.avatar}
                       key={post._id}
                       setLike={setLike}
                       setDislike={setDislike}
                       id={post._id}
                       authUserId={authUserId}
                       postWasLiked={!!postWasLiked}
                       createdAt={post?.createdAt}
                       likedAccounts={post?.likedAccounts}
                       image={post.image}
                       authorId={post.user._id}
                       editAccess={access}
          ></Post>
        })}
      </div>
    </div>
  );
};

export default MyPosts;
