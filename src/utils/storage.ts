import { Wallet } from '../types/wallet';

const STORAGE_KEY = 'wallet_keeper_wallets';

export class StorageUtils {
  static getWallets(): Wallet[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading wallets from storage:', error);
      return [];
    }
  }

  static saveWallets(wallets: Wallet[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets));
    } catch (error) {
      console.error('Error saving wallets to storage:', error);
    }
  }

  static addWallet(wallet: Wallet): void {
    const wallets = this.getWallets();
    wallets.push(wallet);
    this.saveWallets(wallets);
  }

  static removeWallet(walletId: string): void {
    const wallets = this.getWallets();
    const filtered = wallets.filter(w => w.id !== walletId);
    this.saveWallets(filtered);
  }
}