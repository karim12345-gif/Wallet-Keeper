import { useState, useEffect, useCallback } from 'react';
import { Wallet, WalletBalance } from '../types/wallet';
import { WalletUtils, NETWORKS } from '../utils/wallet';
import { StorageUtils } from '../utils/storage';

export interface UseWalletsReturn {
  wallets: Wallet[];
  balances: Record<string, WalletBalance[]>;
  loading: boolean;
  error: string | null;
  generateWallet: (password: string, name?: string) => Promise<void>;
  removeWallet: (walletId: string) => void;
  refreshBalances: () => Promise<void>;
  decryptPrivateKey: (walletId: string, password: string) => Promise<string>;
}

export const useWallets = (): UseWalletsReturn => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [balances, setBalances] = useState<Record<string, WalletBalance[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load wallets from storage on mount
  useEffect(() => {
    const storedWallets = StorageUtils.getWallets();
    setWallets(storedWallets);
  }, []);

  const generateWallet = useCallback(
    async (password: string, name?: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!password.trim()) {
          throw new Error('Password is required');
        }

        const newWallet = WalletUtils.createEncryptedWallet(password, name);

        StorageUtils.addWallet(newWallet);
        setWallets((prev) => [...prev, newWallet]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate wallet';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeWallet = useCallback(
    (walletId: string) => {
      try {
        StorageUtils.removeWallet(walletId);
        setWallets((prev) => prev.filter((w) => w.id !== walletId));
        setBalances((prev) => {
          const newBalances = { ...prev };
          const wallet = wallets.find((w) => w.id === walletId);
          if (wallet) {
            delete newBalances[wallet.address];
          }
          return newBalances;
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to remove wallet';
        setError(errorMessage);
      }
    },
    [wallets]
  );

  const refreshBalances = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const balancePromises = wallets.flatMap((wallet) =>
        NETWORKS.map((network) =>
          WalletUtils.getBalance(wallet.address, network)
        )
      );

      const results = await Promise.allSettled(balancePromises);
      const newBalances: Record<string, WalletBalance[]> = {};

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const balance = result.value;

          // ✅ Add proper type checking for address
          if (balance && balance.address) {
            if (!newBalances[balance.address]) {
              newBalances[balance.address] = [];
            }
            newBalances[balance.address].push(balance);
          }
        }
      });

      setBalances(newBalances);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to refresh balances';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [wallets]);

  const decryptPrivateKey = useCallback(
    async (walletId: string, password: string): Promise<string> => {
      const wallet = wallets.find((w) => w.id === walletId);
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      return WalletUtils.decryptWallet(wallet, password);
    },
    [wallets]
  );

  return {
    wallets,
    balances,
    loading,
    error,
    generateWallet,
    removeWallet,
    refreshBalances,
    decryptPrivateKey,
  };
};
