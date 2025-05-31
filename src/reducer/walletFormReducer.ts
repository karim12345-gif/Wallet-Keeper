import {
  WalletFormAction,
  WalletFormActionType,
  WalletFormState,
} from '../types/WalletGenerator';

export const initialState: WalletFormState = {
  password: '',
  walletName: '',
  showPassword: false,
  error: '',
};

export const walletFormReducer = (
  state: WalletFormState,
  action: WalletFormAction
): WalletFormState => {
  switch (action.type) {
    case WalletFormActionType.SET_PASSWORD:
      return {
        ...state,
        password: action.payload || '',
        error: '',
      };

    case WalletFormActionType.SET_WALLET_NAME:
      return {
        ...state,
        walletName: action.payload || '',
        error: '',
      };

    case WalletFormActionType.TOGGLE_PASSWORD_VISIBILITY:
      return {
        ...state,
        showPassword: !state.showPassword,
      };

    case WalletFormActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload || '',
      };

    case WalletFormActionType.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    case WalletFormActionType.RESET_FORM:
      return { ...initialState };

    default:
      return state;
  }
};
