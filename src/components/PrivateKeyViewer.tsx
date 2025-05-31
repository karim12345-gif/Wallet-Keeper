import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useAppSelector } from '../hooks/redux';
import { WalletUtils } from '../utils/wallet';
import React, {
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  initialPrivateKeyState,
  PrivateKeyActionType,
  privateKeyReducer,
} from '../types';

const PrivateKeyViewer: React.FC = () => {
  const { wallets } = useAppSelector((state) => state.wallet);
  const [state, dispatch] = useReducer(
    privateKeyReducer,
    initialPrivateKeyState
  );
  const timeoutRef = useRef<NodeJS.Timeout>();

  const walletOptions = useMemo(() => {
    const formatAddress = (address: string) =>
      `${address.slice(0, 6)}...${address.slice(-4)}`;

    return wallets.map((wallet) => ({
      id: wallet.id,
      label: `${wallet.name || `Wallet ${formatAddress(wallet.address)}`} - ${formatAddress(wallet.address)}`,
      value: wallet.id,
    }));
  }, [wallets]);

  const handleRevealPrivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: PrivateKeyActionType.RESET_FORM });

    if (!state.selectedWalletId || !state.password) {
      dispatch({
        type: PrivateKeyActionType.SET_ERROR,
        payload: 'Please select a wallet and enter your password',
      });
      return;
    }

    dispatch({ type: PrivateKeyActionType.SET_LOADING, payload: true });

    try {
      const wallet = wallets.find((w) => w.id === state.selectedWalletId);
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      const decryptedKey = WalletUtils.decryptWallet(wallet, state.password);
      dispatch({
        type: PrivateKeyActionType.REVEAL_PRIVATE_KEY,
        payload: decryptedKey,
      });
    } catch (err) {
      dispatch({
        type: PrivateKeyActionType.SET_ERROR,
        payload: 'Invalid password or corrupted wallet data',
      });
    } finally {
      dispatch({ type: PrivateKeyActionType.SET_LOADING, payload: false });
    }
  };

  const handleCopyPrivateKey = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.privateKey);
      dispatch({ type: PrivateKeyActionType.SET_COPIED, payload: true });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: PrivateKeyActionType.SET_COPIED, payload: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy private key:', err);
      alert('Failed to copy to clipboard');
    }
  }, [state.privateKey]);

  const handleHidePrivateKey = () => {
    dispatch({ type: PrivateKeyActionType.HIDE_PRIVATE_KEY });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (wallets.length === 0) {
    return (
      <Card title="View Private Keys">
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.257-2.257A6 6 0 0121 9z"
            />
          </svg>
          <p className="text-gray-500">
            No wallets available. Generate a wallet first.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="View Private Keys">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-300">
        {!state.showPrivateKey ? (
          <form onSubmit={handleRevealPrivateKey} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Wallet
              </label>
              <select
                value={state.selectedWalletId}
                onChange={(e) =>
                  dispatch({
                    type: PrivateKeyActionType.SET_WALLET_ID,
                    payload: e.target.value,
                  })
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Choose a wallet...</option>
                {walletOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={(e) =>
                  dispatch({
                    type: PrivateKeyActionType.SET_PASSWORD,
                    payload: e.target.value,
                  })
                }
                placeholder="Enter wallet password"
                required
                error={state.error}
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: PrivateKeyActionType.TOGGLE_PASSWORD_VISIBILITY,
                  })
                }
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {state.showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0"
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
                  <h4 className="text-sm font-medium text-red-800">
                    Security Warning
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    Never share your private key with anyone. Anyone with access
                    to your private key can control your wallet and steal your
                    funds.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="danger"
              loading={state.loading}
              disabled={!state.selectedWalletId || !state.password}
              className="w-full"
            >
              Reveal Private Key
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Private Key Revealed
              </h3>
              <Button
                onClick={handleHidePrivateKey}
                variant="secondary"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Hide
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Private Key
                </label>
                <Button
                  onClick={handleCopyPrivateKey}
                  size="sm"
                  variant="primary"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {state.copiedPrivateKey ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="font-mono text-sm bg-white p-3 rounded border border-gray-200 break-all">
                {state.privateKey}
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0"
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
                  <h4 className="text-sm font-medium text-red-800">
                    Security Reminder
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    Make sure you're in a secure environment. Clear your
                    clipboard after use and never share this key.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleHidePrivateKey}
              variant="secondary"
              className="w-full"
            >
              Hide Private Key
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PrivateKeyViewer;
