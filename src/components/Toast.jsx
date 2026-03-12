import { useNotification } from '../context/NotificationContext';

export function ToastContainer() {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} id={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ type, message, onClose }) {
  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
