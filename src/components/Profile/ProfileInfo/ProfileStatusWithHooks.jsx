//
import React, {useEffect, useState} from "react";
import styles from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState( false );
   let [status, setStatus] = useState( props.status );

   useEffect( () => {
      setStatus( props.status )
   }, [props.status] )


   const activateEditMode = () => {
      setEditMode( true );
   }

   const deActivateEditMode = () => {
      setEditMode( false );
      props.updateStatus( status );
   }

   const onStatusChange = (e) => {
      setStatus( e.currentTarget.value )
   }

   return (
      <div>

         {!editMode &&
         <div className={styles.status}>
            <b>Статус</b><span>: </span>
            <span onDoubleClick={activateEditMode}>
               {props.status}
            </span>
         </div>
         }

         {editMode &&
         <div>
            <input
               autoFocus={true}
               onBlur={deActivateEditMode}
               onChange={onStatusChange}
               value={status}
            />
         </div>
         }

      </div>
   );
}


export default ProfileStatusWithHooks;

