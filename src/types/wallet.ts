export interface Wallet {
  id: string;
  address: string;
  encryptedPrivateKey: string;
  createdAt: string;
  name?: string;
}

export interface WalletBalance {
  address: string;
  balance: string;
  network: string;
  symbol: string;
}

export interface Network {
  name: string;
  chainId: number;
  rpcUrl: string;
  symbol: string;
  backupRpcs?: string[];
}
