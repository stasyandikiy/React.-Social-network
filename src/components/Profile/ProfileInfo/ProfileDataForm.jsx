import React from "react";
import {ErrorMessageWrapper} from "../../../utils/validators/validators";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from "./ProfileInfo.module.css";
import StyleVal from "../../../utils/validators/ErrorMessage.module.css";

const validationSchema = Yup.object().shape( {

   fullName: Yup.string()
      .min( 2, "Must be longer than 2 characters !" )
      .max( 25, "Must be shorter than 5 characters !" )
      .required( "Required !" ),

   lookingForAJobDescription: Yup.string()
      .min( 2, "Must be longer than 2 characters !" )
      .max( 50, "Must be shorter than 5 characters !" )
      .required( "Required !" ),

   aboutMe: Yup.string()
      .min( 2, "Must be longer than 2 characters !" )
      .max( 50, "Must be shorter than 5 characters !" )
      .required( "Required !" ),

} );

let contactsJsx = (name) => {
   return (
      <div key={name} className={styles.contact}>
         <div>
            <b>{name}</b>:
         </div>

         <div>
            <Field
               name={`contacts.${name}`}
               type={'text'}
               id={name}
               placeholder={name}
            />
         </div>
      </div>);
}


const ProfileDataForm = (props) => {

   let {profile, handleSubmit, goToViewMode} = props;

   let objectFromApiCopy = JSON.parse( JSON.stringify( profile ) );

   const arrayWithNames = Object.keys( profile.contacts );

   arrayWithNames.forEach( (item) => {
      let value = objectFromApiCopy.contacts[item];
      if (value === null) {
         objectFromApiCopy.contacts[item] = '';
      }
   } )


   return (
      <div>

         <Formik
            initialValues={objectFromApiCopy}
            validationSchema={validationSchema}
            onSubmit={(values, bagWithMethods) => {
               let {setStatus, setSubmitting } = bagWithMethods;

               handleSubmit( values, setStatus, setSubmitting, goToViewMode);
            }}
         >
            {(propsF) => {

               let {status, isSubmitting} = propsF;

               return (
                  <Form>

                     <div>
                        <Field
                           name={'fullName'}
                           type={'text'}
                           placeholder={"Повне ім'я"}
                        />
                     </div>
                     <ErrorMessage name="fullName">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>
                        < br />
                     </div>

                     <div>
                        <Field 
                           name={'lookingForAJob'}
                           type={'checkbox'}
                           id='lookingForAJob' />
                        <label htmlFor={'lookingForAJob'}>
                           <b> Шукаю роботу: </b> </label>
                     </div>

                     <div>
                        < br />
                     </div>

                     <div>
                        <Field className={styles.textareaInfo}
                           name={'lookingForAJobDescription'}
                           as={'textarea'}
                           placeholder={'Мої професійні навички'}
                        />
                     </div>
                     <ErrorMessage name="lookingForAJobDescription">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>
                        < br />
                     </div>

                     <div>
                        <Field className={styles.textareaInfo}
                           name={'aboutMe'}
                           as={'textarea'}
                           placeholder={'Про мене'}
                        />
                     </div>
                     <ErrorMessage name="aboutMe">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>
                        < br />
                     </div>

                     <div>
                        <b>Контакти</b>:
                     </div>

                     <FieldArray
                        name="friends"
                        render={() => (
                           <div>
                              {arrayWithNames.map( name => contactsJsx( name ) )}
                           </div>
                        )}
                     />

                     <div>
                        < br />
                     </div>

                     {status &&
                     <div className={StyleVal.validationErrorMessage}>
                        <b> {status} - with setStatus </b>
                     </div>}

                     <button type={'submit'}
                             disabled={isSubmitting}
                     >{isSubmitting ? "Please wait..." : "Зберегти"}
                     </button>

                     <button onClick={goToViewMode}
                             type={'button'}
                             className={styles.buttonCancel}> Відмінити
                     </button>

                  </Form>
               )
            }}
         </Formik>


         <div>
            
         </div>

         <div>
            < br />
         </div>


      </div>)
}

export default ProfileDataForm;
