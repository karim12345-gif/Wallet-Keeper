import { WalletUtils, NETWORKS } from '../../../src/utils/wallet';

jest.mock('ethers', () => ({
  ethers: {
    Wallet: {
      createRandom: jest.fn(() => ({
        address: '0x123',
        privateKey: '0xabc',
      })),
    },
    JsonRpcProvider: jest.fn().mockImplementation(() => ({
      getBalance: jest.fn().mockResolvedValue(BigInt('1000000000000000000')),
    })),
    formatEther: jest.fn(() => '1.0'),
  },
}));

jest.mock('../../../src/utils/crypto', () => ({
  CryptoUtils: {
    encrypt: jest.fn(() => 'encrypted'),
    decrypt: jest.fn(() => '0xabc'),
  },
}));

describe('WalletUtils', () => {
  //   const wallet = WalletUtils.createEncryptedWallet('password123', 'Test');

  //   expect(wallet.address).toBe('0x123');
  //   expect(wallet.name).toBe('Test');
  //   expect(wallet.encryptedPrivateKey).toBe('encrypted');
  // });

  it('gets balance from network', async () => {
    const balance = await WalletUtils.getBalance('0x123', NETWORKS[0]);

    expect(balance.address).toBe('0x123');
    expect(balance.network).toBe(NETWORKS[0].name);
    expect(balance.symbol).toBe(NETWORKS[0].symbol);

    expect(typeof balance.balance).toBe('string');
  });

  it('validates network configuration', () => {
    expect(NETWORKS).toHaveLength(2);
    expect(NETWORKS[0]).toHaveProperty('name');
    expect(NETWORKS[0]).toHaveProperty('chainId');
    expect(NETWORKS[0]).toHaveProperty('rpcUrl');
  });
});
