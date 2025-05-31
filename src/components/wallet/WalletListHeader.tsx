import React from 'react';
import { Button } from '../ui/Button';
import { WalletListHeaderProps } from '../types';

export const WalletListHeader: React.FC<WalletListHeaderProps> = ({
  walletCount,
  loading,
  onRefresh,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Your Wallets ({walletCount})
      </h2>
      <Button onClick={onRefresh} loading={loading} variant="primary" size="sm">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Refresh All
      </Button>
    </div>
  );
};
