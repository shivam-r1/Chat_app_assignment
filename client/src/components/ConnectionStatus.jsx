export default function ConnectionStatus({ connected = false }) {
  return (
    <div className="connection-status">
      <span className={`status-dot ${connected ? 'connected' : ''}`}></span>
      <span className="status-text">{connected ? 'Connected' : 'Connecting...'}</span>
    </div>
  );
}

