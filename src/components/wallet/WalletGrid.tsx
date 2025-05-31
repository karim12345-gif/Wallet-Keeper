import React from 'react';
import { checkBNBBalance } from '../../utils/balance';
import WalletCard from './WalletCard';
import { WalletGridProps } from '../types';

export const WalletGrid: React.FC<WalletGridProps> = ({
  wallets,
  balances,
  loading,
  onRefresh,
  onRemove,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => {
        const walletBalances = balances[wallet.address] || [];
        const balanceCheck = checkBNBBalance(walletBalances);

        return (
          <div key={wallet.id} className="relative">
            {!balanceCheck.hasEnough && (
              <div className="absolute top-2 right-2 z-10">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Low {balanceCheck.symbol}
                </span>
              </div>
            )}
            <WalletCard
              wallet={wallet}
              balances={walletBalances}
              loading={loading}
              formatAddress={formatAddress}
              onRefresh={onRefresh}
              onRemove={onRemove}
            />
          </div>
        );
      })}
    </div>
  );
};
