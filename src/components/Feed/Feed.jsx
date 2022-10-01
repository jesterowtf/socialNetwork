import React, {useEffect, useState} from "react";
import Preloader from "../../UI/Preloader/Preloader";
import s from "./feed.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getIsFetching, getPostsData} from "../../redux/selectors/feed-selectors";
import {getPosts} from "../../redux/feed-reducer";
import Post from "../Profile/MyPosts/Post/Post";
import {getAuthUserId} from "../../redux/selectors/login-selectors";
import {setDislike, setLike} from "../../redux/feed-reducer";
import CheckEditAccess from "../../helpers/checkEditAccess";

const Feed = (props) => {
  const isFetching = useSelector(getIsFetching)
  const authUserId = useSelector(getAuthUserId)

  const [friendsPostsMode, setFriendsPostsMode] = useState(false)

  const dispatch = useDispatch()
  const postsData = useSelector(getPostsData)

  useEffect(() => {
    if (friendsPostsMode) {
      dispatch(getPosts(friendsPostsMode))

    } else {
      dispatch(getPosts())
    }
  }, [friendsPostsMode])

  const changeGetPostsMode = () => {
    setFriendsPostsMode(prevState => !prevState)
  }







  return (
    <>
      {isFetching ? <Preloader /> :
      <div className={s.feed}>
        <h2 className={s.feed__title}>Новости</h2>
        <div>
          <div className={s.filter__friendsModeBox}>
            <label className={s.checkbox}>
              <input type="checkbox" checked={friendsPostsMode} onChange={changeGetPostsMode}/>
              <span>Показывать только посты от друзей</span>
            </label>
          </div>
        </div>
        <div>
          {
            postsData.map((post) => {
              let postWasLiked =  post.likedAccounts.find(el => {
                return el === authUserId;
              })



              return <Post
                likes={post.likesCount}
                text={post.text}
                title={post.title}
                authorImage={post.user?.avatar}
                key={post._id}
                id={post._id}
                setLike={setLike}
                setDislike={setDislike}
                authUserId={authUserId}
                postWasLiked={!!postWasLiked}
                createdAt={post?.createdAt}
                likedAccounts={post?.likedAccounts}
                image={post.image}
                authorId={post.user._id}
                editAccess={false}
              />
            })
          }
        </div>
      </div>
      }
    </>
  );
};

export default Feed;
