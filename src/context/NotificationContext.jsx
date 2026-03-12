import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

const TOAST_DURATION = 5000;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), TOAST_DURATION);
    return id;
  }, [removeToast]);

  const toast = useCallback(
    {
      success: (message) => addToast('success', message),
      error: (message) => addToast('error', message),
      info: (message) => addToast('info', message)
    },
    [addToast]
  );

  return (
    <NotificationContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
