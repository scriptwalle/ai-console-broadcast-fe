import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../buttons/Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  actions,
  className = '',
  overlayClassName = '',
  ...props
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
        ${overlayClassName}
      `.trim()}
      onClick={handleOverlayClick}
      {...props}
    >
      <div
        className={`
          bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full mx-4 border border-slate-200 dark:border-slate-700
          ${sizes[size] || sizes.md}
          ${className}
        `.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex justify-end space-x-3 p-6 pt-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Convenience wrapper for confirmation dialogs
export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
  ...props
}) => {
  const actions = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={loading}
      >
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant}
        onClick={onConfirm}
        loading={loading}
        disabled={loading}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      actions={actions}
      {...props}
    >
      <p className="text-slate-600 dark:text-slate-300">
        {message}
      </p>
    </Modal>
  );
};

export default Modal;