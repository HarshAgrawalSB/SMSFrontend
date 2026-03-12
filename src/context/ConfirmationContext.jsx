import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ConfirmationContext = createContext(null);

const defaultOptions = {
  title: 'Confirm',
  message: 'Are you sure?',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'default' // 'default' | 'danger'
};

export function ConfirmationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [resolveRef, setResolveRef] = useState(null);

  const confirmDialog = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setOptions({ ...defaultOptions, ...opts });
      setResolveRef(() => resolve);
      setOpen(true);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    if (resolveRef) resolveRef(true);
    setResolveRef(null);
  }, [resolveRef]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    if (resolveRef) resolveRef(false);
    setResolveRef(null);
  }, [resolveRef]);

  return (
    <ConfirmationContext.Provider value={{ confirmDialog }}>
      {children}
      {open && (
        <ConfirmDialog
          title={options.title}
          message={options.message}
          confirmLabel={options.confirmLabel}
          cancelLabel={options.cancelLabel}
          variant={options.variant}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const ctx = useContext(ConfirmationContext);
  if (!ctx) throw new Error('useConfirmation must be used within ConfirmationProvider');
  return ctx;
}

function ConfirmDialog({ title, message, confirmLabel, cancelLabel, variant, onConfirm, onCancel }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <div
      className="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      onClick={onCancel}
    >
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 id="confirm-title" className="confirm-title">{title}</h2>
        <p id="confirm-message" className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button type="button" className="btn btn-ghost-app" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={variant === 'danger' ? 'btn btn-danger-app' : 'btn btn-primary-app'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
