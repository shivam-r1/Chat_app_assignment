export default function ConnectionStatus({ status = 'Disconnected' }) {
  return (
    <div className="connection-status">
      <span className="status-dot"></span>
      <span className="status-text">{status}</span>
    </div>
  );
}
