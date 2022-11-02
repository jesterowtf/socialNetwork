import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTemporaryImageUrl} from "../../../../redux/selectors/profile-selectors";
import {useForm} from "react-hook-form";
import {updatePost, uploadImageAndGetUrl} from "../../../../redux/profile-reducer";
import s from "../NewPost/newpost.module.scss";
import {uploadToCloud} from "../../../../API/api";

const EditPost = ({editModeOff, postId, text, title, image}) => {

  const [newText, setNewText] = useState(text || '')
  const [newImage, setNewImage] = useState(image || '')

  const dispatch = useDispatch()
  const imageUrlRedux = useSelector(getTemporaryImageUrl)

  const {register, handleSubmit, reset} = useForm();

  const uploadRef = React.createRef();
  const editPostRef = React.createRef();


  useEffect(() => {
    if (!!imageUrlRedux) {
      setNewImage(imageUrlRedux)
    }

  }, [imageUrlRedux, newImage])

  const onSubmit = async (data, e) => {
    data.postId = postId
    if (imageUrlRedux) {
      data.image = newImage;
    } else {
      data.image = image
    }
    dispatch(updatePost({_id: data.postId, text: data.text, title: data.title, image: data?.image} ))
    reset()
    editModeOff()
  }


  const onChange = async (e) => {
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      uploadToCloud(formData, uploadImageAndGetUrl, dispatch)
      setNewImage(imageUrlRedux)
    } catch (e) {
      console.log(e)
    }
  }

  const cancelEdit = (e) => {
    if (editPostRef.current && !editPostRef.current.contains(e.target)) {
      console.log(editPostRef.current)
      console.log(editPostRef.current.contains(e.target))
      editModeOff()
    } else {
      editModeOff()
    }
  }

  return  (
     <div>
      <div className={s.editPost} onBlur={cancelEdit} ref={editPostRef} autoFocus={true}>
        <span className={s.cancelButton} onClick={cancelEdit}>Отменить редактирование</span>
        <p className={s.editPost__title}>Редактирование поста</p>
        <form onSubmit={handleSubmit(onSubmit)} className={s.newPostForm}>
          <div>
            <p className={s.inputTitle}>Пост</p>
            <textarea {...register('text', {
              required: true,
              minLength: 3,
              maxLength: 5000
            })} placeholder='Напишите сообщение'
                className={s.newPost}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}

            />

          </div>
          <div className={s.postButtons}>
            <button onClick={(e) => {
              e.preventDefault()
              uploadRef.current.click()
            } } className={s.sendPost}>Изменить изображение</button>
            <img src={newImage ? newImage : image}
                 alt="oldImage"
                 className={s.oldImage}/>
            <input
              type='file'
              accept="image/png, image/gif, image/jpeg"
              onChange={onChange}
              className={s.uploadInput}
              ref={uploadRef}
            ></input>

            <button type='submit' className={s.sendPost}>Отправить</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default EditPost;