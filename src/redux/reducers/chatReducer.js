import {updateObject} from '../../utils'

const defaultState = {
    messages: [],
    chats: [],
    fetched: false,
}

const addMessage = (state, action) => {
    return updateObject(state, {
      messages: [...state.messages, action.message]
    });
  };
  
  const setMessages = (state, action) => {
    return updateObject(state, {
      messages: action.messages.reverse()
    });
  };
  
  const setChats = (state, action) => {
    return updateObject(state, {
      chats: action.chats.reverse(),
      fetched: true,
    });
  };
  

  const chatReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return addMessage(state, action);
      case 'SET_MESSAGES':
        return setMessages(state, action);
      case 'GET_CHATS_SUCCESS':
        return setChats(state, action);
      case 'CEAR_STATE':
        return {
          messages: [],
          chats: [],
          fetched: false,
        }
      default:
        return state;
    }
};

export default chatReducer