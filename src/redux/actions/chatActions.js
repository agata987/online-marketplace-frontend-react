import API_Handler from '../../API_Handler'

export const addMessage = message => ({type: 'ADD_MESSAGE', message: message})
export const setMessages = messages => ({type: 'SET_MESSAGES', messages: messages})
export const clearMessages = () => ({type: 'CEAR_STATE'})
  
const getUserChatsSuccess = chats => ({type: 'GET_CHATS_SUCCESS', chats: chats})

export const getUserChats = user_id => dispatch => {
    API_Handler(true, {method: 'get', url: `chat/?user_id=${user_id}`})
    .then(res => dispatch(getUserChatsSuccess(res.data)))
    .catch(() => {})
}