import { ethers } from 'ethers';
import { Wallet, Network, WalletBalance } from '../types/wallet';
import { CryptoUtils } from './crypto';

export const NETWORKS: Network[] = [
  {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.eth.gateway.fm', 
    symbol: 'ETH',
  },
  {
    name: 'BSC Testnet',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
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
    const privateKey = CryptoUtils.decrypt(wallet.encryptedPrivateKey, password);
    
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

  static async getBalance(address: string, network: Network): Promise<WalletBalance> {
    try {
      
      const provider = new ethers.JsonRpcProvider(network.rpcUrl);
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);


      return {
        address,
        balance: formattedBalance,
        network: network.name,
      };
    } catch (error) {
      console.error(` Error fetching balance for ${address} on ${network.name}:`, error);
      return {
        address,
        balance: '0',
        network: network.name,
      };
    }
  }

  static isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}