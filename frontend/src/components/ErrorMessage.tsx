import React from 'react';
import { AlertCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export type ErrorSeverity = 'error' | 'warning' | 'info';

export interface ErrorMessageProps {
  message: string;
  severity?: ErrorSeverity;
  title?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  details?: string[];
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  severity = 'error',
  title,
  onRetry,
  onDismiss,
  details,
  className = ''
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <XCircle size={24} />;
      case 'warning':
        return <AlertTriangle size={24} />;
      case 'info':
        return <Info size={24} />;
    }
  };

  return (
    <div className={`error-message error-message--${severity} ${className}`} role="alert">
      <div className="error-message__icon">
        {getIcon()}
      </div>
      <div className="error-message__content">
        {title && <h3 className="error-message__title">{title}</h3>}
        <p className="error-message__text">{message}</p>
        {details && details.length > 0 && (
          <ul className="error-message__details">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        )}
        {(onRetry || onDismiss) && (
          <div className="error-message__actions">
            {onRetry && (
              <button className="ghost-action" onClick={onRetry}>
                Try Again
              </button>
            )}
            {onDismiss && (
              <button className="ghost-action" onClick={onDismiss}>
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const InlineError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="inline-error">
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  );
};
