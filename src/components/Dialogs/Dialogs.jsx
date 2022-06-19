//
import React from "react";
import styles from './Dialogs.module.css';
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ErrorMessageWrapper} from "../../utils/validators/validators";
import * as Yup from "yup";


const Dialogs = (props) => {

   let state = props.dialogsPage;

   let dialogsElement = state.sidebar.map( d => <DialogItems name={d.name} id={d.id} key={d.id} /> );

   let messagesElement = state.messages.map( m => <Message message={m.message} key={m.id} /> );


   if (!props.isAuth) {
      return <Navigate to={'/login'} />
   }


   return (
      <div className={styles.dialogs}>

         <div className={styles.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={styles.messages}>

            <div>{messagesElement}</div>
            <div className={styles.submitMessage}>
                    <AddMassageForm sendMessage={props.sendMessage} />                
                    </div>

         </div>

      </div>
   );
}


const AddMassageForm = (props) => {

   const validationSchema = Yup.object().shape( {

      newMessageBody: Yup.string()
         .min( 1, " " )
         .max( 180, "Максимальна кілкість символів - 180 !" )
         .required( "Required !" )
   } );

   const addNewMessage = (values) => {

      props.sendMessage( values );

   }

   return (
      <Formik
         initialValues={{
            newMessageBody: ""
         }}
         validationSchema={validationSchema}
         onSubmit={(values, {resetForm}) => {
            addNewMessage( values.newMessageBody );
            resetForm( {values: ''} );
         }}
      >
         {() => (
            <Form>
               <div>
                  <Field  className={styles.textarea}
                     name={'newMessageBody'}
                     as={'textarea'}
                     placeholder={'Напишите сообщение..'}
                  />
               </div >
               <ErrorMessage name="newMessageBody">
                  {ErrorMessageWrapper}
               </ErrorMessage>

               <button type={'submit'} className={styles.btnSubmit}>Отправить</button>
            </Form>
         )}
      </Formik>
   )
}

export default Dialogs;


// так было раньше без формика
// onSubmit={(values) =>
// addNewMessage( values )
//
// <div>
//    <div>
//                   <textarea value={newMessageBody}
//                             onChange={onSendMessageChange}
//                             placeholder='enter text'>
//                   </textarea>
//    </div>
//
//    <div>
//       <button onClick={onSendMessageClick}>Send</button>
//    </div>
// </div>
//
// let onSendMessageClick = () => {
//    props.sendMessage();
// }
//
// если занулить не все нужно до делаем так
// resetForm( {
//    values: {
//       newMessageBody: ''
//    }
// } )
