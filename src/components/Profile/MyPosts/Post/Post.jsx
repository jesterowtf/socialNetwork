import React, {useEffect, useLayoutEffect, useState} from "react";
import s from "./post.module.scss";

import {useDispatch} from "react-redux";
import like from "./../../../../assets/images/like.svg"
import likelight from "./../../../../assets/images/likelight.svg"
import notlike from "./../../../../assets/images/notlike.svg"
import noavatar from "../../../../assets/images/noavatar.png";
import trash from "../../../../assets/images/trash.png";
import pen from "../../../../assets/images/pen.png";
import settings from "../../../../assets/images/settings.png";
import {Link} from "react-router-dom";
import {deletePost} from "../../../../redux/profile-reducer";
import EditPost from "./EditPost";

const Post = (props) => {
  let { text, image,
    likes, authorId, authorImage,
    createdAt, id, postWasLiked, editAccess, setLike, setDislike} = props;
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [deleted, setPostDeleted] = useState(false);
  const [editMode, setEditMode] = useState(false)

  const trueDate = createdAt?.replace(/T/, ' ').replace(/\..+/, '');
  const postImage = image;
  const theme = localStorage.getItem('app-theme');


  useLayoutEffect(() => {
    if (!!postWasLiked) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [postWasLiked, editMode]);

  useEffect(() => {

  }, [likes, editMode] )

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

  const editModeOn = (e) => {
    setEditMode(true)
  }

  const editModeOff = () => {
    setEditMode(false)
  }

  return (
    <>
      {!deleted &&
    <div className={s.posts__Item}>
      <div className={s.post__box}>
        <div className={s.post__ava}>
          <Link to={`/profile/${authorId}`}>
            <img
              src={authorImage || noavatar}
              alt="authorImage"
              className={s.post__avaImg}
            />
          </Link>
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
        {editAccess &&
          <div className={s.postSetting}>
            <button className={s.settingButton}>
              <img src={settings} alt="settings" className={s.settingButton__img}/>
            </button>
            <div className={s.editButtons}>
              <button className={s.deleteButton} onClick={() => onDelete(id)}>
                <img src={trash} alt="?????????????? ????????" className={s.deleteButton__img}/>
              </button>
              <button className={s.deleteButton} onClick={editModeOn}>
                <img src={pen} alt="?????????????????????????? ????????" className={s.deleteButton__img}/>
              </button>
            </div>
        </div>}
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
      { editMode &&
        <EditPost
          editModeOff={editModeOff}
          postId={id}
          text={text}
          image={image}
        />}
    </div>}
    </>
  );
};

export default Post;
