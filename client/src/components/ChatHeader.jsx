import ConnectionStatus from './ConnectionStatus';

export default function ChatHeader({ room = 'general', status = 'connecting' }) {
  return (
    <header className="chat-header">
      <div className="room-info">
        <h1 className="room-name">#{room}</h1>
      </div>
      <ConnectionStatus status={status} />
    </header>
  );
}
