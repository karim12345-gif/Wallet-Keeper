import { Wallet, WalletBalance } from "../../types/wallet";


export interface WalletState {
  wallets: Wallet[];
  balances: Record<string, WalletBalance[]>;
  loading: boolean;
  error: string | null;
}

export const initialState: WalletState = {
  wallets: [],
  balances: {},
  loading: false,
  error: null,
};
