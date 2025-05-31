import React from 'react';
import { Button } from './Button';
import { ConfirmationModalProps } from '../types';
import { variantStyles } from '../../constants';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'danger',
  cancelText = 'Cancel',
  variant = 'danger',
  walletName,
  walletAddress,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const currentVariant = variantStyles[variant];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all">
          {/* Header */}
          <div className={`${currentVariant.bgColor} rounded-t-xl px-6 py-4`}>
            <div className="flex items-center">
              <div className={`${currentVariant.iconBg} rounded-full p-2 mr-3`}>
                {currentVariant.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <p className="text-gray-700 mb-4">{message}</p>

            {/* Wallet Info */}
            {walletName && walletAddress && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Wallet Details:
                </h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {walletName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {formatAddress(walletAddress)}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-amber-800">
                    <strong>Warning:</strong> This action cannot be undone. Make
                    sure you have your private key backed up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
            <Button onClick={onClose} variant="primary" size="sm">
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              variant="danger"
              size="sm"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
