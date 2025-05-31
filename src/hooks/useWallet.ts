import { useState } from 'react';
import { useAppDispatch } from './redux';
import { removeWallet, refreshBalances } from '../store/slices/walletSlice';
import { Wallet } from '../types/wallet';
import { ModalState, INITIAL_MODAL_STATE } from '../components/types';

export const useWalletActions = () => {
  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState<ModalState>(INITIAL_MODAL_STATE);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleRefreshBalances = async (wallets: Wallet[]) => {
    try {
      setRefreshError(null);
      await dispatch(refreshBalances(wallets)).unwrap();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to refresh balances';

      if (errorMessage.includes('insufficient BNB')) {
        setRefreshError(
          'Some wallets have insufficient BNB for gas fees. Add BNB to perform transactions.'
        );
      } else {
        setRefreshError(errorMessage);
      }
    }
  };

  const handleRemoveWallet = (walletId: string, wallets: Wallet[]) => {
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
      setModalState(INITIAL_MODAL_STATE);
    }
  };

  const closeModal = () => {
    setModalState(INITIAL_MODAL_STATE);
  };

  return {
    modalState,
    refreshError,
    handleRefreshBalances,
    handleRemoveWallet,
    confirmRemoveWallet,
    closeModal,
  };
};
