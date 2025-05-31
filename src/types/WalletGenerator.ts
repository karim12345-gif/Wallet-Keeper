// Action types enum
enum WalletFormActionType {
  SET_PASSWORD = 'SET_PASSWORD',
  SET_WALLET_NAME = 'SET_WALLET_NAME',
  TOGGLE_PASSWORD_VISIBILITY = 'TOGGLE_PASSWORD_VISIBILITY',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  RESET_FORM = 'RESET_FORM',
}

interface WalletFormState {
  password: string;
  walletName: string;
  showPassword: boolean;
  error: string;
}

// Action types
type WalletFormAction =
  | { type: WalletFormActionType.SET_PASSWORD; payload: string }
  | { type: WalletFormActionType.SET_WALLET_NAME; payload: string }
  | { type: WalletFormActionType.TOGGLE_PASSWORD_VISIBILITY }
  | { type: WalletFormActionType.SET_ERROR; payload: string }
  | { type: WalletFormActionType.CLEAR_ERROR }
  | { type: WalletFormActionType.RESET_FORM };

// Initial state
const initialState: WalletFormState = {
  password: '',
  walletName: '',
  showPassword: false,
  error: '',
};

export { WalletFormActionType, initialState };
export type { WalletFormAction, WalletFormState };
