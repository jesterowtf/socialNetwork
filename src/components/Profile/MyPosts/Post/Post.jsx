import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./post.module.scss";

import {useDispatch} from "react-redux";
import like from "./../../../../assets/images/like.svg"
import likelight from "./../../../../assets/images/likelight.svg"
import notlike from "./../../../../assets/images/notlike.svg"
import noavatar from "../../../../assets/images/noavatar.png";
import xbutton from "../../../../assets/images/xbutton.png";
import {Link} from "react-router-dom";
import {deletePost} from "../../../../redux/profile-reducer";

const Post = (props) => {
  let { text, title, image,
    likes, authorId, authorImage,
    createdAt, id, postWasLiked, editAccess, setLike, setDislike} = props;
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [deleted, setPostDeleted] = useState(false);

  const trueDate = createdAt?.replace(/T/, ' ').replace(/\..+/, '');
  const postImage = `https://social-network-backend-lemon.vercel.app${image}`;
  const theme = localStorage.getItem('app-theme');


  useLayoutEffect(() => {
    if (!!postWasLiked) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [postWasLiked]);

  useEffect(() => {

  }, [likes] )

  const onDelete = (postId) => {
    dispatch(deletePost(postId))
    setPostDeleted(true)
  }

  const setL =  (postId) => {
     dispatch(setLike(postId))
    setLiked(true)
  }

  const setD =  (postId) => {
     dispatch(setDislike(postId))
    setLiked(false)
  }

  return (
    <>
      {!deleted &&
    <div className={s.posts__Item}>
      <div className={s.post__box}>
        <div className={s.post__ava}>
          <Link to={`/profile/${authorId}`}>
            <img
              src={authorImage ? authorImage : noavatar}
              alt="authorImage"
              className={s.post__avaImg}
            />
          </Link>
        </div>
        <div className={s.post__text}>
          <div className={s.postTitleBox}>
            <span className={s.postTitle}>{title}</span>
          </div>
          <div className={s.postTextBox}>
            {image &&
            <span className={s.postImageBox}>
              <img src={postImage} alt="postImage" className={s.postImage}/>
            </span>}
            <span className={s.postText}>
              <pre style={{whiteSpace: "break-spaces"}}>{text}</pre>
            </span>
          </div>
        </div>
      </div>

      <div className={s.bottomStroke}>
        {editAccess &&
        <div className={s.postSetting}>
          <button className={s.deleteButton} onClick={() => onDelete(id)}>
            <img src={xbutton} alt="deletePost" className={s.deleteButton__img}/>
          </button>
        </div> }
        <div className={s.post__data}>
          {trueDate}
        </div>

        {liked &&
          <div className={s.post__buttons} onClick={() => {setD(id)}}>
            <img src={theme === 'dark' ? like : likelight} alt="like" className={s.likes}/>
            {likes}
          </div>
        }

        {!liked &&
          <div className={s.post__buttons} onClick={() => {setL(id)}}>
            <img src={notlike} alt="dislike" className={s.likes}/>
            {likes}
          </div>
        }


      </div>
    </div>}
    </>
  );
};

export default Post;
