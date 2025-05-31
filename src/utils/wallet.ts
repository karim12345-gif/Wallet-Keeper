import { ethers } from 'ethers';
import { Wallet, Network, WalletBalance } from '../types/wallet';
import { CryptoUtils } from './crypto';

export const NETWORKS: Network[] = [
  {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.eth.gateway.fm',
    backupRpcs: [
      'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://eth-sepolia.public.blastapi.io',
      'https://rpc.sepolia.org',
      'https://sepolia.gateway.tenderly.co',
      'https://ethereum-sepolia.publicnode.com',
    ],
    symbol: 'ETH',
  },
  {
    name: 'BSC Testnet',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    backupRpcs: [
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://bsc-testnet.public.blastapi.io',
      'https://bsc-testnet.publicnode.com',
    ],
    symbol: 'tBNB',
  },
];

export class WalletUtils {
  static generateWallet(): { address: string; privateKey: string } {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  static createEncryptedWallet(password: string, name?: string): Wallet {
    const { address, privateKey } = this.generateWallet();
    const encryptedPrivateKey = CryptoUtils.encrypt(privateKey, password);

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      address,
      encryptedPrivateKey,
      createdAt: new Date().toISOString(),
      name,
    };
  }

  static decryptWallet(wallet: Wallet, password: string): string {
    const privateKey = CryptoUtils.decrypt(
      wallet.encryptedPrivateKey,
      password
    );

    // Validate the decrypted private key
    try {
      const ethersWallet = new ethers.Wallet(privateKey);
      if (ethersWallet.address.toLowerCase() !== wallet.address.toLowerCase()) {
        throw new Error('Invalid password');
      }
      return privateKey;
    } catch {
      throw new Error('Invalid password');
    }
  }

  static async getBalance(
    address: string,
    network: Network
  ): Promise<WalletBalance> {
    const rpcsToTry = [network.rpcUrl, ...(network.backupRpcs || [])];

    for (let i = 0; i < rpcsToTry.length; i++) {
      const rpcUrl = rpcsToTry[i];

      try {
        console.log(`Trying RPC ${i + 1}/${rpcsToTry.length}: ${rpcUrl}`);

        const provider = new ethers.JsonRpcProvider(rpcUrl, {
          chainId: network.chainId,
          name: network.name,
        });

        // Add timeout to prevent hanging
        const balance = await Promise.race([
          provider.getBalance(address),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('RPC timeout')), 10000)
          ),
        ]);

        const formattedBalance = ethers.formatEther(balance);

        console.log(`✅ Successfully got balance from ${rpcUrl}`);

        return {
          address,
          balance: formattedBalance,
          network: network.name,
          symbol: network.symbol,
        };
      } catch (error) {
        console.warn(`RPC ${rpcUrl} failed:`, error);

        // If this is the last RPC, throw the error
        if (i === rpcsToTry.length - 1) {
          console.error(
            `All RPCs failed for ${network.name}. Last error:`,
            error
          );

          // Return zero balance instead of throwing to prevent app crash
          return {
            address,
            balance: '0',
            network: network.name,
            symbol: network.symbol,
          };
        }

        continue;
      }
    }

    return {
      address,
      balance: '0',
      network: network.name,
      symbol: network.symbol,
    };
  }

  static isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}
