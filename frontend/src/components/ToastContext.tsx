import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  onRetry?: () => void;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>('bottom-right');

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, position, setPosition }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} position={position} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{ 
  toasts: Toast[]; 
  removeToast: (id: string) => void;
  position: ToastPosition;
}> = ({ toasts, removeToast, position }) => {
  return (
    <div className={`toast-container toast-container--${position}`}>
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastComponent: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  React.useEffect(() => {
    const duration = toast.duration ?? 5000;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, toast.duration]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="toast-icon success" />;
      case 'error':
        return <AlertCircle className="toast-icon error" />;
      case 'warning':
        return <AlertTriangle className="toast-icon warning" />;
      case 'info':
        return <AlertTriangle className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast toast--${toast.type}`} role="alert" aria-live="polite">
      {getIcon()}
      <div className="toast-content">
        {toast.title && <p className="toast-title">{toast.title}</p>}
        <p className="toast-message">{toast.message}</p>
        {toast.onRetry && (
          <button className="toast-retry" onClick={toast.onRetry}>
            <Loader2 size={14} />
            Retry
          </button>
        )}
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={18} />
      </button>
    </div>
  );
};
