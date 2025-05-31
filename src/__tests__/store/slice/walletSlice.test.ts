import { configureStore } from '@reduxjs/toolkit';
import walletReducer, {
  generateWallet,
  refreshBalances,
  removeWallet,
  clearError,
} from '../../../store/slices/walletSlice';
import { WalletUtils } from '../../../utils/wallet';

jest.mock('../../../utils/wallet');

const mockWalletUtils = WalletUtils as jest.Mocked<typeof WalletUtils>;

const createStore = () =>
  configureStore({
    reducer: { wallet: walletReducer },
  });

describe('walletSlice', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    jest.clearAllMocks();
  });

  it('starts with empty state', () => {
    const state = store.getState().wallet;
    expect(state.wallets).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('generates a new wallet', async () => {
    const mockWallet = {
      id: 'test-id',
      address: '0x123',
      name: 'Test',
      encryptedPrivateKey: 'encrypted',
      createdAt: '2023-01-01',
    };

    mockWalletUtils.createEncryptedWallet.mockReturnValue(mockWallet);

    await store.dispatch(generateWallet({ password: 'test123', name: 'Test' }));

    expect(store.getState().wallet.wallets).toContain(mockWallet);
  });

  it('handles password validation', async () => {
    await store.dispatch(generateWallet({ password: '' }));

    expect(store.getState().wallet.error).toBe('Password is required');
  });

  it('refreshes wallet balances', async () => {
    const mockWallets = [
      {
        id: '1',
        address: '0x123',
        name: 'Test',
        encryptedPrivateKey: 'enc',
        createdAt: '2023-01-01',
      },
    ];

    mockWalletUtils.getBalance.mockResolvedValue({
      address: '0x123',
      balance: '1.0',
      network: 'Ethereum Sepolia',
      symbol: 'ETH',
    });

    const result = await store.dispatch(refreshBalances(mockWallets));
    expect(result.type).toContain('fulfilled');
  });

  it('removes wallets', () => {
    store.dispatch({
      type: 'wallet/generateWallet/fulfilled',
      payload: {
        id: 'test',
        address: '0x123',
        name: 'Test',
        encryptedPrivateKey: 'enc',
        createdAt: '2023-01-01',
      },
    });

    store.dispatch(removeWallet('test'));

    expect(store.getState().wallet.wallets).toHaveLength(0);
  });

  it('clears errors', () => {
    store.dispatch({
      type: 'wallet/generateWallet/rejected',
      payload: 'Test error',
    });

    store.dispatch(clearError());

    expect(store.getState().wallet.error).toBeNull();
  });
});
