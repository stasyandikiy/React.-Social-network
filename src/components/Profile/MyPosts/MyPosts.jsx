//
import React from "react";
import styles from './MyPosts.module.css';
import Post from './Posts/Post';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {ErrorMessageWrapper} from "../../../utils/validators/validators";
import postPhoto from './postPhoto.png'

const MyPosts = props => {

   // тут reverse - для теста
   let postsElement =
      [...props.posts]
         .reverse()
         .map( p => <Post value={p.message} likesCount={p.likesCount} key={p.id} /> );

   return (
      <div className={styles.postsBlock}>

         <h3 className={styles.text_h3}>
            Мои публикации
         </h3>

         <AddNewPostForm
            addPost={props.addPost}
         />

         <div className={styles.posts}>
            {postsElement}
         </div>
         <button className={styles.photoPostBtn}><img src={postPhoto} /></button>

      </div>
   );
};


const AddNewPostForm = (props) => {

   const validationSchema = Yup.object().shape( {

      newPostText: Yup.string()
         .min( 2, "Пост повинен мати мінімум 2 літери !" )
         .max( 100, "Пост повинен мати максимум 100 літер !" )
         .required( "Required !" )
   } );

   const OnAddPost = (values) => {
      props.addPost( values );
   }

   return (
      <Formik
         initialValues={{
            newPostText: ""
         }}
         validationSchema={validationSchema}
         onSubmit={(values, {resetForm}) => {
            OnAddPost( values.newPostText );
            resetForm( {values: ''} );
         }}
      >
         {() => (
            <Form>
               <div>
                  <Field  className={styles.postTextarea}
                     name={'newPostText'}
                     as={'textarea'}
                     placeholder={'Что у вас нового?'}
                  />
               </div>

               <ErrorMessage name="newPostText">
                  {ErrorMessageWrapper}
               </ErrorMessage>

               <button className={styles.postButton} type={'submit'}>Опубликовать</button>
            </Form>
         )}
      </Formik>
   )
}


export default MyPosts;

