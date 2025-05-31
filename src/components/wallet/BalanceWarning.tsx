import React from 'react';
import { BalanceWarningProps } from '../types';

export const BalanceWarning: React.FC<BalanceWarningProps> = ({
  current,
  required,
  walletAddress,
  symbol,
  network,
}) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <svg
          className="w-5 h-5 text-yellow-400 mt-0.5 mr-3"
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
          <h3 className="text-sm font-medium text-yellow-800">
            Insufficient {symbol} for Transactions on {network}:{' '}
            <span className="font-mono text-xs bg-yellow-100 px-2 py-1 rounded">
              {walletAddress}
            </span>
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            Current: {current.toFixed(4)} {symbol} | Required: {required}{' '}
            {symbol}
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Add {symbol} to your wallet to perform transactions on {network}{' '}
            network.
          </p>
        </div>
      </div>
    </div>
  );
};
