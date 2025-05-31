import {
  WalletFormAction,
  WalletFormActionType,
} from '../types/WalletGenerator';

export const walletFormActions = {
  setPassword: (password: string): WalletFormAction => ({
    type: WalletFormActionType.SET_PASSWORD,
    payload: password,
  }),

  setWalletName: (name: string): WalletFormAction => ({
    type: WalletFormActionType.SET_WALLET_NAME,
    payload: name,
  }),

  togglePasswordVisibility: (): WalletFormAction => ({
    type: WalletFormActionType.TOGGLE_PASSWORD_VISIBILITY,
  }),

  setError: (error: string): WalletFormAction => ({
    type: WalletFormActionType.SET_ERROR,
    payload: error,
  }),

  clearError: (): WalletFormAction => ({
    type: WalletFormActionType.CLEAR_ERROR,
  }),

  resetForm: (): WalletFormAction => ({
    type: WalletFormActionType.RESET_FORM,
  }),
};
