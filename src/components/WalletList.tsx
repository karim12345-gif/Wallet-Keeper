import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Card } from './ui/Card';
import { FundingInstructions } from './FundingInstructions';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { EmptyWalletState } from './wallet/EmptyWalletState';
import { WalletListHeader } from './wallet/WalletListHeader';
import { ErrorDisplay } from './wallet/ErrorDisplay';
import { InsufficientBalanceWarnings } from './wallet/InsufficientBalanceWarnings';
import { WalletGrid } from './wallet/WalletGrid';
import { useWalletActions } from '../hooks/useWallet';

const WalletList: React.FC = () => {
  const { wallets, balances, loading, error } = useAppSelector(
    (state) => state.wallet
  );

  const {
    modalState,
    refreshError,
    handleRefreshBalances,
    handleRemoveWallet,
    confirmRemoveWallet,
    closeModal,
  } = useWalletActions();

  const onRefresh = () => handleRefreshBalances(wallets);
  const onRemove = (walletId: string) => handleRemoveWallet(walletId, wallets);

  const firstWalletAddress = wallets.length > 0 ? wallets[0].address : null;

  if (wallets.length === 0) {
    return <EmptyWalletState />;
  }

  return (
    <>
      <Card>
        <WalletListHeader
          walletCount={wallets.length}
          loading={loading}
          onRefresh={onRefresh}
        />

        <ErrorDisplay error={error} refreshError={refreshError} />

        <InsufficientBalanceWarnings wallets={wallets} balances={balances} />

        <WalletGrid
          wallets={wallets}
          balances={balances}
          loading={loading}
          onRefresh={onRefresh}
          onRemove={onRemove}
        />

        {firstWalletAddress && (
          <div className="mt-8">
            <FundingInstructions walletAddress={firstWalletAddress} />
          </div>
        )}
      </Card>

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

export default WalletList;
