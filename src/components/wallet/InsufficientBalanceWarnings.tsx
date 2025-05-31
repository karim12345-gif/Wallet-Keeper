import React from 'react';
import { BalanceWarning } from './BalanceWarning';
import { checkBNBBalance } from '../../utils/balance';
import { InsufficientBalanceWarningsProps } from '../types';

export const InsufficientBalanceWarnings: React.FC<
  InsufficientBalanceWarningsProps
> = ({ wallets, balances }) => {
  const walletsWithLowBNB = wallets.filter((wallet) => {
    const walletBalances = balances[wallet.address] || [];
    const balanceCheck = checkBNBBalance(walletBalances);
    return !balanceCheck.hasEnough;
  });

  if (walletsWithLowBNB.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        ⚠️ Wallets with Low Native Tokens ({walletsWithLowBNB.length})
      </h3>
      {walletsWithLowBNB.map((wallet) => {
        const walletBalances = balances[wallet.address] || [];
        const balanceCheck = checkBNBBalance(walletBalances);
        return (
          <BalanceWarning
            key={wallet.id}
            current={balanceCheck.current}
            required={balanceCheck.required}
            walletAddress={wallet.address}
            symbol={balanceCheck.symbol}
            network={balanceCheck.network}
          />
        );
      })}
    </div>
  );
};
