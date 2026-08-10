export default function ConnectionStatus({ status = 'connecting' }) {
  const label =
    status === 'connected'
      ? 'Connected'
      : status === 'disconnected'
      ? 'Disconnected'
      : 'Connecting...';

  return (
    <div className="connection-status">
      <span className={`status-dot ${status}`}></span>
      <span className="status-text">{label}</span>
    </div>
  );
}
