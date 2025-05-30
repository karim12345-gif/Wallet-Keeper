import { ethers } from 'ethers';
import { WalletUtils, NETWORKS } from '../../../src/utils/wallet';
import { CryptoUtils } from '../../../src/utils/crypto';

// Mock dependencies
jest.mock('ethers');
jest.mock('../../../src/utils/crypto');

const mockEthers = ethers as jest.Mocked<typeof ethers>;
const mockCryptoUtils = CryptoUtils as jest.Mocked<typeof CryptoUtils>;

describe('WalletUtils', () => {
  const mockWallet = {
    address: '0x1234567890123456789012345678901234567890',
    privateKey: '0xabc123'
  };

  const mockProvider = {
    getBalance: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mockEthers.Wallet.createRandom as jest.Mock).mockReturnValue(mockWallet);
    (mockEthers.JsonRpcProvider as jest.Mock).mockReturnValue(mockProvider);
    (mockEthers.formatEther as jest.Mock).mockImplementation(wei => {
      if (wei === BigInt('1000000000000000000')) return '1.0';
      if (wei === BigInt('0')) return '0.0';
      return '1.0';
    });
    
    // Mock CryptoUtils
    mockCryptoUtils.encrypt.mockReturnValue('encrypted-data');
    mockCryptoUtils.decrypt.mockReturnValue(mockWallet.privateKey);
    
    (mockEthers.Wallet as unknown as jest.Mock).mockImplementation((privateKey) => ({
      address: mockWallet.address,
      privateKey
    }));
  });

  describe('createEncryptedWallet', () => {
    it('creates wallet with custom name', () => {
      const result = WalletUtils.createEncryptedWallet('password123', 'Custom');
      
      expect(result).toMatchObject({
        id: expect.any(String),
        address: mockWallet.address,
        encryptedPrivateKey: 'encrypted-data',
        name: 'Custom',
        createdAt: expect.any(String)
      });
    });

    it('creates wallet without name', () => {
      const result = WalletUtils.createEncryptedWallet('password123');
      expect(result.name).toBeUndefined();
    });
  });

  describe('decryptWallet', () => {
    const testWallet = {
      id: 'test',
      address: mockWallet.address,
      encryptedPrivateKey: 'encrypted-data',
      name: 'Test',
      createdAt: '2023-01-01'
    };

    it('decrypts successfully', () => {
      const result = WalletUtils.decryptWallet(testWallet, 'password');
      expect(result).toBe(mockWallet.privateKey);
      expect(mockCryptoUtils.decrypt).toHaveBeenCalledWith('encrypted-data', 'password');
    });

    it('throws error for wrong password', () => {
      mockCryptoUtils.decrypt.mockReturnValue('invalid-private-key');
      
      (mockEthers.Wallet as unknown as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid private key');
      });
      
      expect(() => WalletUtils.decryptWallet(testWallet, 'wrong')).toThrow('Invalid password');
    });
  });

  describe('getBalance', () => {
    it('fetches balance successfully', async () => {
      mockProvider.getBalance.mockResolvedValue(BigInt('1000000000000000000'));
      
      const result = await WalletUtils.getBalance('0x123', NETWORKS[0]);
      
      expect(result).toEqual({
        address: '0x123',
        balance: '1.0',
        network: NETWORKS[0].name
      });
    });

    it('handles network errors gracefully', async () => {
      mockProvider.getBalance.mockRejectedValue(new Error('Network error'));
      
      const result = await WalletUtils.getBalance('0x123', NETWORKS[0]);
      
      expect(result).toEqual({
        address: '0x123',
        balance: '0',
        network: NETWORKS[0].name
      });
    });
  });

  describe('NETWORKS', () => {
    it('has valid network configuration', () => {
      expect(NETWORKS).toHaveLength(2);
      expect(NETWORKS[0]).toMatchObject({
        name: expect.stringContaining('Sepolia'),
        chainId: 11155111,
        rpcUrl: expect.stringMatching(/^https?:\/\//)
      });
    });
  });
});