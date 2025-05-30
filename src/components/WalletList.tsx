import React, { useState } from 'react';
import { removeWallet, refreshBalances } from '../store/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { FundingInstructions } from './FundingInstructions';
import { ConfirmationModal } from './ui/ConfirmationModal';

export const WalletList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { wallets, balances, loading } = useAppSelector(
    (state) => state.wallet
  );
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    walletId: string | null;
    walletName: string | null;
    walletAddress: string | null;
  }>({
    isOpen: false,
    walletId: null,
    walletName: null,
    walletAddress: null,
  });

  const handleRefreshBalances = () => {
    dispatch(refreshBalances(wallets));
  };

  const handleRemoveWallet = (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId);
    if (wallet) {
      setModalState({
        isOpen: true,
        walletId,
        walletName: wallet.name || `Wallet ${formatAddress(wallet.address)}`,
        walletAddress: wallet.address,
      });
    }
  };

  const confirmRemoveWallet = () => {
    if (modalState.walletId) {
      dispatch(removeWallet(modalState.walletId));
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      walletId: null,
      walletName: null,
      walletAddress: null,
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallets.length === 0) {
    return (
      <Card title="Your Wallets">
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Wallets Yet
          </h3>
          <p className="text-gray-600">
            Generate your first wallet to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Wallets ({wallets.length})
          </h2>
          <Button
            onClick={handleRefreshBalances}
            loading={loading}
            variant="primary"
            size="sm"
          >
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

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
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
                      {balances[wallet.address]?.length > 0 ? (
                        balances[wallet.address].map((balance) => (
                          <div key={balance.network} className="balance-item">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-blue-700">
                                {balance.network}
                              </span>
                              <span className="font-mono text-gray-900 font-semibold">
                                {parseFloat(balance.balance).toFixed(6)}{' '}
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium ml-1">
                                  {balance.network.includes('BSC')
                                    ? 'tBNB'
                                    : 'ETH'}
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
                    <strong>Created:</strong>{' '}
                    {new Date(wallet.createdAt).toLocaleDateString()} at{' '}
                    {new Date(wallet.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                <div className="ml-4 flex flex-row space-x-2">
                  <Button
                    onClick={() => handleRefreshBalances()}
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
                    onClick={() => handleRemoveWallet(wallet.id)}
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
          ))}
        </div>

        {wallets.length > 0 && (
          <div className="mt-8">
            <FundingInstructions walletAddress={wallets[0]?.address} />
          </div>
        )}
      </Card>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={confirmRemoveWallet}
        title="Remove Wallet"
        message="Are you sure you want to permanently remove this wallet? This action cannot be undone."
        confirmText="Remove Wallet"
        cancelText="Cancel"
        variant="danger"
        walletName={modalState.walletName || undefined}
        walletAddress={modalState.walletAddress || undefined}
      />
    </>
  );
};
