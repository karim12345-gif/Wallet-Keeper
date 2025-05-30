import { configureStore } from '@reduxjs/toolkit';
import walletReducer, { 
  generateWallet, 
  refreshBalances, 
  loadWallets, 
  removeWallet, 
  clearError 
} from '../../../store/slices/walletSlice';
import { WalletUtils } from '../../../utils/wallet';
import { StorageUtils } from '../../../utils/storage';

// Mock dependencies
jest.mock('../../../utils/wallet');
jest.mock('../../../utils/storage');

const mockWalletUtils = WalletUtils as jest.Mocked<typeof WalletUtils>;
const mockStorageUtils = StorageUtils as jest.Mocked<typeof StorageUtils>;

jest.mock('../../../utils/wallet', () => ({
  WalletUtils: {
    createEncryptedWallet: jest.fn(),
    getBalance: jest.fn(),
  },
  NETWORKS: [
    { name: 'Ethereum Sepolia', chainId: 11155111, rpcUrl: 'https://sepolia.test', symbol: 'ETH' },
    { name: 'BSC Testnet', chainId: 97, rpcUrl: 'https://bsc.test', symbol: 'tBNB' },
  ]
}));

const createTestStore = () => configureStore({ reducer: { wallet: walletReducer } });

describe('walletSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      expect(store.getState().wallet).toEqual({
        wallets: [],
        balances: {},
        loading: false,
        error: null,
      });
    });
  });

  describe('generateWallet', () => {
    const mockWallet = {
      id: 'test-id',
      address: '0x123',
      name: 'Test',
      encryptedPrivateKey: 'encrypted',
      createdAt: '2023-01-01'
    };

    it('generates wallet successfully', async () => {
      mockWalletUtils.createEncryptedWallet.mockReturnValue(mockWallet);
      
      await store.dispatch(generateWallet({ password: 'test123', name: 'Test' }));
      
      const state = store.getState().wallet;
      expect(state.wallets).toContain(mockWallet);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('rejects empty password', async () => {
      await store.dispatch(generateWallet({ password: '' }));
      
      const state = store.getState().wallet;
      expect(state.error).toBe('Password is required');
      expect(state.wallets).toHaveLength(0);
    });
  });

  describe('refreshBalances', () => {
    const mockWallets = [{ id: '1', address: '0x123', name: 'Test', encryptedPrivateKey: 'enc', createdAt: '2023-01-01' }];
    
    it('completes refresh balances operation', async () => {
      const mockBalance = { address: '0x123', balance: '1.0', network: 'Ethereum Sepolia' };
      mockWalletUtils.getBalance.mockResolvedValue(mockBalance);
      
      const result = await store.dispatch(refreshBalances(mockWallets));
      
      const state = store.getState().wallet;
      expect(result.type).toBe('wallet/refreshBalances/fulfilled');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('loadWallets', () => {
    it('loads wallets from storage', async () => {
      const mockWallets = [{ id: '1', address: '0x123', name: 'Test', encryptedPrivateKey: 'enc', createdAt: '2023-01-01' }];
      mockStorageUtils.getWallets.mockReturnValue(mockWallets);
      
      await store.dispatch(loadWallets());
      
      const state = store.getState().wallet;
      expect(state.wallets).toEqual(mockWallets);
    });
  });

  describe('reducers', () => {
    it('removes wallet', () => {
      store.dispatch({
        type: 'wallet/generateWallet/fulfilled',
        payload: { id: 'test', address: '0x123', name: 'Test', encryptedPrivateKey: 'enc', createdAt: '2023-01-01' }
      });
      
      store.dispatch(removeWallet('test'));
      
      const state = store.getState().wallet;
      expect(state.wallets).toHaveLength(0);
      expect(mockStorageUtils.removeWallet).toHaveBeenCalledWith('test');
    });

    it('clears error', () => {
      // Set error first
      store.dispatch({ type: 'wallet/generateWallet/rejected', payload: 'Test error' });
      
      store.dispatch(clearError());
      
      expect(store.getState().wallet.error).toBeNull();
    });
  });
});