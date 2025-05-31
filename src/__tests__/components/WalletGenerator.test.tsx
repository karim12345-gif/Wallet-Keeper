import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import walletReducer from '../../../src/store/slices/walletSlice';
import WalletGenerator from '../../components/wallet/WalletGenerator';

const createStore = () =>
  configureStore({
    reducer: { wallet: walletReducer },
    preloadedState: {
      wallet: { wallets: [], balances: {}, loading: false, error: null },
    },
  });

const renderWithStore = (component: React.ReactElement) =>
  render(<Provider store={createStore()}>{component}</Provider>);

describe('WalletGenerator', () => {
  it('renders the form', () => {
    renderWithStore(<WalletGenerator />);

    expect(screen.getByText('Generate New Wallet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /generate/i })
    ).toBeInTheDocument();
  });

  it('validates password length', async () => {
    renderWithStore(<WalletGenerator />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('enables submit when password is valid', () => {
    renderWithStore(<WalletGenerator />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'validpass' } });

    expect(
      screen.getByRole('button', { name: /generate/i })
    ).not.toBeDisabled();
  });
});
