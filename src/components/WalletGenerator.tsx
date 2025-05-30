import React, { useReducer } from 'react';
import { generateWallet } from '../store/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { initialState, WalletFormActionType, walletFormReducer } from '../types/WalletGenerator';

export const WalletGenerator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.wallet);
  
  // Use useReducer for local form state
  const [formState, formDispatch] = useReducer(walletFormReducer, initialState);
  const { password, walletName, showPassword, error } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formDispatch({ type: WalletFormActionType.CLEAR_ERROR });

    // Validation
    if (!password.trim()) {
      formDispatch({ type: WalletFormActionType.SET_ERROR, payload: 'Password is required' });
      return;
    }

    if (password.length < 6) {
      formDispatch({ 
        type: WalletFormActionType.SET_ERROR, 
        payload: 'Password must be at least 6 characters long' 
      });
      return;
    }

    try {
      await dispatch(generateWallet({ 
        password, 
        name: walletName.trim() || undefined 
      })).unwrap();
      
      // Reset form on success
      formDispatch({ type: WalletFormActionType.RESET_FORM });
      
    } catch (err) {
      formDispatch({ 
        type: WalletFormActionType.SET_ERROR, 
        payload: typeof err === 'string' ? err : 'Failed to generate wallet' 
      });
    }
  };

  return (
    <Card title="Generate New Wallet">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Wallet Name"
            type="text"
            value={walletName}
            onChange={(e) => formDispatch({ 
              type: WalletFormActionType.SET_WALLET_NAME, 
              payload: e.target.value 
            })}
            placeholder="e.g., Main Wallet, Trading Wallet"
            maxLength={50}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => formDispatch({ 
                type: WalletFormActionType.SET_PASSWORD, 
                payload: e.target.value 
              })}
              placeholder="Enter a secure password"
              required
              minLength={6}
              error={error}
              helperText="Minimum 6 characters. This password will encrypt your private key."
            />
            <button
              type="button"
              onClick={() => formDispatch({ type: WalletFormActionType.TOGGLE_PASSWORD_VISIBILITY })}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-amber-800">Security Notice</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Your password encrypts your private key locally. We never store passwords. 
                  If forgotten, wallet access is permanently lost.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!password.trim()}
            className="w-full"
          >
            Generate Wallet
          </Button>
        </form>
      </div>
    </Card>
  );
};