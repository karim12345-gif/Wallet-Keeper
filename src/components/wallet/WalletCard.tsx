import React, { useCallback } from 'react';
import { WalletCardProps } from '../types';
import { Button } from '../ui/Button';

const WalletCard = React.memo<WalletCardProps>(
  ({ wallet, balances, loading, formatAddress, onRefresh, onRemove }) => {
    const handleRemove = useCallback(() => {
      onRemove(wallet.id);
    }, [onRemove, wallet.id]);

    const formatBalance = (balance: string) => {
      const numBalance = parseFloat(balance);
      return isNaN(numBalance) ? '0.000000' : numBalance.toFixed(6);
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:bg-gray-100 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {wallet.name || `Wallet ${formatAddress(wallet.address)}`}
            </h3>

            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <div className="font-mono text-sm text-gray-900 break-all bg-white px-3 py-2 rounded border border-gray-200">
                {wallet.address}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-2">Balances</p>
              <div className="space-y-2">
                {balances.length > 0 ? (
                  balances.map((balance) => (
                    <div key={balance.network} className="balance-item">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-700">
                          {balance.network}
                        </span>
                        <span className="font-mono text-gray-900 font-semibold">
                          {formatBalance(balance.balance)}{' '}
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium ml-1">
                            {balance.network.includes('BSC') ? 'tBNB' : 'ETH'}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-sm text-gray-500">
                      Click "Refresh All" to load balances
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <strong>Created:</strong> {formatDate(wallet.createdAt)}
            </div>
          </div>

          <div className="ml-4 flex flex-row space-x-2">
            <Button
              onClick={onRefresh}
              size="sm"
              variant="secondary"
              disabled={loading}
              className="whitespace-nowrap"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </Button>

            <Button
              onClick={handleRemove}
              size="sm"
              variant="danger"
              className="whitespace-nowrap"
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
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default WalletCard;
