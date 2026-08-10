import { createContext, useState, useContext } from 'react';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [username, setUsername] = useState('');
  const [room] = useState('general');

  return (
    <ChatContext.Provider value={{ username, setUsername, room }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
