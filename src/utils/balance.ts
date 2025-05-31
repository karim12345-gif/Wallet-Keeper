import { WalletBalance } from '../types/wallet';

export interface BalanceCheck {
  hasEnough: boolean;
  current: number;
  required: number;
  symbol: string;
  network: string;
}

export const checkBNBBalance = (
  balances: WalletBalance[],
  requiredAmount: number = 0.002
): BalanceCheck => {
  const nativeBalance = balances.find(
    (balance) =>
      balance.symbol === 'BNB' ||
      balance.symbol === 'ETH' ||
      balance.network === 'BSC' ||
      balance.network === 'Ethereum' ||
      balance.network === 'ETH'
  );

  if (!nativeBalance) {
    return {
      hasEnough: false,
      current: 0,
      required: requiredAmount,
      symbol: 'ETH/BNB',
      network: 'Unknown',
    };
  }

  const currentBalance =
    typeof nativeBalance.balance === 'string'
      ? parseFloat(nativeBalance.balance)
      : nativeBalance.balance;

  return {
    hasEnough: currentBalance >= requiredAmount,
    current: currentBalance,
    required: requiredAmount,
    symbol: nativeBalance.symbol,
    network: nativeBalance.network,
  };
};
