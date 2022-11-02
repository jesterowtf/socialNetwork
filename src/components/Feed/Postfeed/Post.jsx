import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./post.module.scss";

import {useDispatch} from "react-redux";
import like from "./../../../assets/images/like.svg"
import likelight from "./../../../assets/images/likelight.svg"
import notlike from "./../../../assets/images/notlike.svg"
import noavatar from "../../../assets/images/noavatar.png";
import {Link} from "react-router-dom";

const Post = (props) => {
  let { text, title, image,
    likes, authorId, authorImage,
    createdAt, id, postWasLiked, setLike, setDislike, firstName, secondName} = props;

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const trueDate = createdAt?.replace(/T/, ' ').replace(/\..+/, '');
  const postImage = image;
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

    <div className={s.posts__Item}>
      <div className={s.post__box}>
        <div className={s.post__header}>
          <div className={s.post__ava}>
            <Link to={`/profile/${authorId}`}>
              <img
                src={authorImage || noavatar}
                alt="authorImage"
                className={s.post__avaImg}
              />
            </Link>
          </div>
          <div className={s.post__info}>
            <div className={s.post__authorInfo}>
              {firstName} {secondName}
            </div>
            <div className={s.post__date}>
              {trueDate}
            </div>
          </div>


        </div>

        <div className={s.post__text}>
          <div className={s.postTextBox}>
            {image &&
            <span className={s.postImageBox}>
              <img src={postImage} alt="postImage" className={s.postImage}/>
            </span>}
            <span className={s.postText}>
              <pre style={{whiteSpace: "break-spaces", fontFamily: "Montserrat"}}>{text}</pre>
            </span>
          </div>
        </div>
      </div>

      <div className={s.bottomStroke}>

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
    </div>
    </>
  );
};

export default Post;
