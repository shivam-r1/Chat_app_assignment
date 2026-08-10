import ConnectionStatus from './ConnectionStatus';

export default function ChatHeader({ room = 'general' }) {
  return (
    <header className="chat-header">
      <div className="room-info">
        <h2 className="room-name">#{room}</h2>
      </div>
      <ConnectionStatus status="Connecting..." />
    </header>
  );
}
