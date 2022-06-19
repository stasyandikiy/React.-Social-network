//
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {

   sidebar: [
      {id: 1, name: 'Владислав'},
      {id: 2, name: 'Александа'},
      {id: 3, name: 'Дмитрий'},
      {id: 4, name: 'Дима'},
   ],

   messages: [
      {id: 1, message: 'Привет, приходи на массаж'},
      {id: 2, message: 'Не забудь полотенце'},
      {id: 3, message: 'И хорошее настроение'},
   ]

}

const dialogsReducer = (state = initialState, action) => {

   switch (action.type) {

      case SEND_MESSAGE:
         let body = action.newMessageBody;

         let nextIdMessages = state.messages.length + 1

         let newMessage = {
            id: nextIdMessages + body,
            message: body,
         };

         return {
            ...state,
            messages: [...state.messages, newMessage],
         };


      default:
         return state;
   }
}

export const sendMessageCreator = (newMessageBody) => ({
   type: SEND_MESSAGE,
   newMessageBody})

export default dialogsReducer;
