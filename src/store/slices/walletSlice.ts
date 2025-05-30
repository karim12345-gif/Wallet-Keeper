import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Wallet, WalletBalance } from '../../types/wallet';
import { WalletUtils, NETWORKS } from '../../utils/wallet';
import { StorageUtils } from '../../utils/storage';
import { initialState, WalletState } from '../types';

// Async thunks with proper typing
export const generateWallet = createAsyncThunk<
  Wallet,
  { password: string; name?: string },
  { rejectValue: string }
>('wallet/generateWallet', async ({ password, name }, { rejectWithValue }) => {
  try {
    if (!password.trim()) {
      return rejectWithValue('Password is required');
    }

    // encrypt the password
    const newWallet = WalletUtils.createEncryptedWallet(password, name);
    StorageUtils.addWallet(newWallet);
    return newWallet;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to generate wallet'
    );
  }
});

export const refreshBalances = createAsyncThunk<
  Record<string, WalletBalance[]>,
  Wallet[],
  { rejectValue: string }
>('wallet/refreshBalances', async (wallets, { rejectWithValue }) => {
  try {
    const balancePromises = wallets.flatMap((wallet: Wallet) =>
      NETWORKS.map(async (network) => {
        const balance = await WalletUtils.getBalance(wallet.address, network);
        return { address: wallet.address, balance };
      })
    );

    const results = await Promise.allSettled(balancePromises);
    const balances: Record<string, WalletBalance[]> = {};

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { address, balance } = result.value;
        if (!balances[address]) {
          balances[address] = [];
        }
        balances[address].push(balance);
      }
    });

    return balances;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to refresh balances'
    );
  }
});

export const loadWallets = createAsyncThunk<
  Wallet[],
  void,
  { rejectValue: string }
>('wallet/loadWallets', async (_, { rejectWithValue }) => {
  try {
    return StorageUtils.getWallets();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to load wallets'
    );
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    removeWallet: (state: WalletState, action: PayloadAction<string>) => {
      const walletId = action.payload;
      const wallet = state.wallets.find((w) => w.id === walletId);

      state.wallets = state.wallets.filter((w) => w.id !== walletId);

      if (wallet) {
        delete state.balances[wallet.address];
      }

      // Update storage
      StorageUtils.removeWallet(walletId);
    },
    clearError: (state: WalletState) => {
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<WalletState>) => {
    builder
      // Generate wallet cases
      .addCase(generateWallet.pending, (state: WalletState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        generateWallet.fulfilled,
        (state: WalletState, action: PayloadAction<Wallet>) => {
          state.loading = false;
          state.wallets.push(action.payload);
        }
      )
      .addCase(
        generateWallet.rejected,
        (state: WalletState, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error =
            typeof action.payload === 'string'
              ? action.payload
              : 'Failed to generate wallet';
        }
      )

      // Load wallets cases
      .addCase(loadWallets.pending, (state: WalletState) => {
        state.loading = true;
      })
      .addCase(
        loadWallets.fulfilled,
        (state: WalletState, action: PayloadAction<Wallet[]>) => {
          state.loading = false;
          state.wallets = action.payload;
        }
      )
      .addCase(
        loadWallets.rejected,
        (state: WalletState, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error =
            typeof action.payload === 'string'
              ? action.payload
              : 'Failed to load wallets';
        }
      )

      // Refresh balances cases
      .addCase(refreshBalances.pending, (state: WalletState) => {
        state.loading = true;
      })
      .addCase(
        refreshBalances.fulfilled,
        (
          state: WalletState,
          action: PayloadAction<Record<string, WalletBalance[]>>
        ) => {
          state.loading = false;
          state.balances = action.payload;
        }
      )
      .addCase(
        refreshBalances.rejected,
        (state: WalletState, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error =
            typeof action.payload === 'string'
              ? action.payload
              : 'Failed to load wallets';
        }
      );
  },
});

export const { removeWallet, clearError } = walletSlice.actions;
export default walletSlice.reducer;
