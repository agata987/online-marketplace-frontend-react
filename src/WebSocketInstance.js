const BACKEND_WS_URL = 'ws://127.0.0.1:8000/ws/';

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chatId) {
    const path = `${BACKEND_WS_URL}chat/${chatId}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_message') {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(user_id, chatId) {
    this.sendMessage({
      command: 'fetch_messages',
      user_id: user_id,
      chatId: chatId,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: 'new_message',
      from: message.from,
      message: message.content,
      chatId: message.chatId,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
