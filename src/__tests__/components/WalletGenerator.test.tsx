import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { WalletGenerator } from '../../../src/components/WalletGenerator';
import walletReducer from '../../../src/store/slices/walletSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      wallet: walletReducer,
    },
    preloadedState: {
      wallet: {
        wallets: [],
        balances: {},
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('WalletGenerator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders wallet generator form', () => {
    renderWithProvider(<WalletGenerator />);
    
    expect(screen.getByText('Generate New Wallet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/main wallet, trading wallet/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter a secure password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate wallet/i })).toBeInTheDocument();
  });

  it('displays security notice', () => {
    renderWithProvider(<WalletGenerator />);
    
    expect(screen.getByText('Security Notice')).toBeInTheDocument();
    expect(screen.getByText(/password encrypts your private key locally/i)).toBeInTheDocument();
  });

  it('handles wallet name input', () => {
    renderWithProvider(<WalletGenerator />);
    
    const walletNameInput = screen.getByPlaceholderText(/main wallet, trading wallet/i);
    fireEvent.change(walletNameInput, { target: { value: 'My Test Wallet' } });
    
    expect(walletNameInput).toHaveValue('My Test Wallet');
  });

  it('handles password input', () => {
    renderWithProvider(<WalletGenerator />);
    
    const passwordInput = screen.getByPlaceholderText(/enter a secure password/i);
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    
    expect(passwordInput).toHaveValue('test123');
  });

  it('disables submit button when password is empty', () => {
    renderWithProvider(<WalletGenerator />);
    
    const submitButton = screen.getByRole('button', { name: /generate wallet/i });
    expect(submitButton).toBeDisabled();
  });


  it('shows loading state when wallet generation is in progress', () => {
    const store = createMockStore({ loading: true });
    renderWithProvider(<WalletGenerator />, store);
    
    const submitButton = screen.getByRole('button', { name: /loading/i });
    expect(submitButton).toBeDisabled();
  });

  it('shows validation error for short password', async () => {
    renderWithProvider(<WalletGenerator />);
    
    const passwordInput = screen.getByPlaceholderText(/enter a secure password/i);
    const submitButton = screen.getByRole('button', { name: /generate wallet/i });
    
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for empty password on submit', async () => {
    renderWithProvider(<WalletGenerator />);
    
    const submitButton = screen.getByRole('button', { name: /generate wallet/i });
    
    // button should be disabled
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('clears error when password becomes valid', async () => {
    renderWithProvider(<WalletGenerator />);
    
    const passwordInput = screen.getByPlaceholderText(/enter a secure password/i);
    const submitButton = screen.getByRole('button', { name: /generate wallet/i });
    
    // Enter short password and submit to trigger error
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
    
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
    });
  });

  it('displays wallet name correctly', () => {
    renderWithProvider(<WalletGenerator />);
    
    const walletNameInput = screen.getByPlaceholderText(/main wallet, trading wallet/i);
    
    fireEvent.change(walletNameInput, { target: { value: 'My Trading Wallet' } });
    expect(walletNameInput).toHaveValue('My Trading Wallet');
  });
});