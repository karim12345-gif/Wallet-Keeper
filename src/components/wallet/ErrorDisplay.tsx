import React from 'react';
import { ErrorDisplayProps } from '../types';

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  refreshError,
}) => {
  if (!error && !refreshError) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <svg
          className="w-5 h-5 text-red-400 mt-0.5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{error || refreshError}</p>
          {(error || refreshError)?.includes('insufficient BNB') && (
            <p className="text-sm text-red-700 mt-1">
              Add at least 0.002 BNB to your wallet for gas fees.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
