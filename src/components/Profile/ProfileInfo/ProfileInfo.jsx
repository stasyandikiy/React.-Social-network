import React, {useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.jpg";
import styles from "./ProfileInfo.module.css";
import ProfileDataForm from "./ProfileDataForm";
import photoProf from './photoProf.jpg';

const ProfileInfo = (props) => {

   let [editMode, setEditMode] = useState( false );

   let {profile, saveProfile} = props;


   if (!profile) {
      return <Preloader />
   }

   let alt_descriptionBlock = `photo_${profile.userId}`;

   const onMainPhotoSelected = (event) => {
      if (event.target.files.length) {
         props.savePhoto( event.target.files[0] )
      }
   }

   const handleSubmit = (formData, setStatus,
                         setSubmitting, goToViewMode) => {

      saveProfile( formData, setStatus, setSubmitting, goToViewMode );

   }


   return (
      <div>

         <div className={styles.photoBlock}>
            <img src={photoProf} />
         </div>

         <div className={styles.descriptionBlock}>
   <div className={styles.loadingPhoto}>
            <img src={profile.photos.small !== null
               ? profile.photos.small
               : userPhoto}
                 className={styles.userPhoto}
                 alt={alt_descriptionBlock}
            />

             {profile.fullName} - Id - {profile.userId}
             
            <div>
               {props.isOwner
               &&
               <input
                  type={'file'}
                  onChange={onMainPhotoSelected}
               />}
            </div>
   </div>

            <div className={styles.profileBlock}>

               {editMode
                  ? <ProfileDataForm profile={profile}
                                     handleSubmit={handleSubmit}
                                     goToViewMode={
                                        () => setEditMode( false )} />
                  : <ProfileData profile={profile}
                                 isOwner={props.isOwner}
                                 goToEditMode={
                                    () => setEditMode( true )} />}

               <ProfileStatusWithHooks
                  status={props.status}
                  updateStatus={props.updateStatus} />

            </div>

         </div>

      </div>
   );
}


const ProfileData = ({profile, isOwner, goToEditMode}) => {

   return (
      <div>

         <div>
            {isOwner &&
            <button className={styles.redact} onClick={goToEditMode}><img src='https://papik.pro/uploads/posts/2021-11/thumbs/1636009366_28-papik-pro-p-karandash-vektornii-risunok-29.png'/>Редагувати інформацію</button>
            }
         </div>

         <div >
            <b> Повне ім'я</b>: {profile.fullName}
         </div>

         <div>
            <b> Шукаю роботу</b>: {profile.lookingForAJob
            ? 'Так' : 'Ні'}
         </div>

         {profile.lookingForAJob &&
         <div>
            <b> Мої професійні навички</b>: {profile.lookingForAJobDescription}
         </div>}

         <div>
            <b> Про мене</b>: {profile.aboutMe}
         </div>

         <div>
            <b> Контакти</b>:
            {Object.keys( profile.contacts ).map( key => {
               return <Contacts
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key]} />
            } )}
         </div>

      </div>)
}


const Contacts = ({contactTitle, contactValue}) => {

   return (
      <div className={styles.contact}>
         <b> {contactTitle}</b>: {contactValue}
      </div>)
}

export default ProfileInfo;