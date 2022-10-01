import React, {useEffect, useState} from "react";
import s from "./newpost.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {sendNewPost, uploadImageAndGetUrl} from "../../../../redux/profile-reducer";
import {getImagePost} from "../../../../redux/selectors/profile-selectors";

const NewPost = (props) => {

  const dispatch = useDispatch()
  const imageUrlRedux = useSelector(getImagePost)

  const {register, handleSubmit, reset} = useForm();

  const uploadRef = React.createRef();
  const [imageUrl, setImageUrl] = useState('');


  const onSubmit = async (data, e) => {
    data.image = imageUrlRedux;
    dispatch(sendNewPost({text: data.text, title: data.title, image: data.image} ))
    reset()
  }
  useEffect(() => {
  }, [imageUrl, uploadRef])

  const onChange = async (e) => {
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      dispatch(uploadImageAndGetUrl(formData))
      setImageUrl(imageUrlRedux)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.newPostBox}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.newPostForm}>
        <div>
          <input {...register('title', {
            required: true,
            minLength: 3,
            maxLength: 100
          })} placeholder='Введите заголовок поста' className={`${s.newPost} ${s.newPostTitle}`}/>
        </div>
        <div>
          <textarea {...register('text', {
            required: true,
            minLength: 3,
            maxLength: 5000
          })} placeholder='Напишите сообщение' className={s.newPost}/>

        </div>
        <div className={s.postButtons}>
          <button onClick={(e) => {
            e.preventDefault()
            uploadRef.current.click()
          } } className={s.sendPost}>Загрузить изображение</button>
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

  );
};

export default NewPost;