//
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
   posts: [
      {id: 1, message: 'У нас твої дані завжди будуть в безпеці', likesCount: 10},
      {id: 2, message: 'Вітаю в соц.мережі "В Україні"', likesCount: 15},
   ],
   profile: null,
   status: '...text...'
}

const profileReducer = (state = initialState, action) => {

   switch (action.type) {

      case ADD_POST: {

         let nextIdMessages = state.posts.length + 1

         let newPosts = {
            id: nextIdMessages + action.newPostText,
            message: action.newPostText,
            likesCount: 552
         }

         return {
            ...state,
            posts: [...state.posts, newPosts],
         }
      }

      case SET_USER_PROFILE:
         return {
            ...state,
            profile: action.profile
         }

      case SET_STATUS:
         return {
            ...state,
            status: action.status
         }

      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter( p => p.id !== action.postId )
         }

      case SAVE_PHOTO_SUCCESS:
         return {
            ...state,
            profile: {...state.profile, photos: action.photos}
         }


      default:
         return state;
   }
}


// начало - акшен криаторы
export const addPostActionCreator = (newPostText) => ({
   type: ADD_POST, newPostText
})


const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})


const setStatus = (status) => ({type: SET_STATUS, status})


export const deletePost = (postId) => ({type: DELETE_POST, postId})


export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
// конец - акшен криаторы


// начало - санк креаторы
export const getUserProfile = (userId) => async (dispatch) => {

   const response = await usersAPI.getProfile( userId );

   dispatch( setUserProfile( response.data ) );

}


export const getStatus = (userId) => async (dispatch) => {

   const response = await profileAPI.getStatus( userId );

   dispatch( setStatus( response.data ) );

}


export const updateStatus = (status) => async (dispatch) => {

   const response = await profileAPI.updateStatus( status );

   if (response.data.resultCode === 0) {
      dispatch( setStatus( status ) );
   }

}


export const savePhoto = (photoFile) => async (dispatch) => {

   const response = await profileAPI.savePhoto( photoFile );

   if (response.data.resultCode === 0) {
      dispatch( savePhotoSuccess( response.data.data.photos ) );
   }

};

export const saveProfile = (formData, setStatus, setSubmitting, goToViewMode) => async (dispatch, getState) => {

   const response = await profileAPI.saveProfile( formData );

   let resultCode = response.data.resultCode;

   if (resultCode === 0) {
      const userId = getState().auth.id;
      goToViewMode();
      dispatch( getUserProfile( userId ) );
   }else {

      let textError = `resultCode: ${resultCode} - ${response.data.messages.join(', ')}`;
      setStatus( textError );
      setSubmitting( false );
   }

};

export default profileReducer;
















