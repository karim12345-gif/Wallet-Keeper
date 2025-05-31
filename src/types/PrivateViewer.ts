export interface PrivateKeyState {
  selectedWalletId: string;
  password: string;
  showPassword: boolean;
  privateKey: string;
  showPrivateKey: boolean;
  error: string;
  loading: boolean;
  copiedPrivateKey: boolean;
}

export enum PrivateKeyActionType {
  SET_WALLET_ID = 'SET_WALLET_ID',
  SET_PASSWORD = 'SET_PASSWORD',
  TOGGLE_PASSWORD_VISIBILITY = 'TOGGLE_PASSWORD_VISIBILITY',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  REVEAL_PRIVATE_KEY = 'REVEAL_PRIVATE_KEY',
  HIDE_PRIVATE_KEY = 'HIDE_PRIVATE_KEY',
  SET_COPIED = 'SET_COPIED',
  RESET_FORM = 'RESET_FORM',
}

export type PrivateKeyAction =
  | { type: PrivateKeyActionType.SET_WALLET_ID; payload: string }
  | { type: PrivateKeyActionType.SET_PASSWORD; payload: string }
  | { type: PrivateKeyActionType.TOGGLE_PASSWORD_VISIBILITY }
  | { type: PrivateKeyActionType.SET_LOADING; payload: boolean }
  | { type: PrivateKeyActionType.SET_ERROR; payload: string }
  | { type: PrivateKeyActionType.REVEAL_PRIVATE_KEY; payload: string }
  | { type: PrivateKeyActionType.HIDE_PRIVATE_KEY }
  | { type: PrivateKeyActionType.SET_COPIED; payload: boolean }
  | { type: PrivateKeyActionType.RESET_FORM };

export const initialPrivateKeyState: PrivateKeyState = {
  selectedWalletId: '',
  password: '',
  showPassword: false,
  privateKey: '',
  showPrivateKey: false,
  error: '',
  loading: false,
  copiedPrivateKey: false,
};

export const privateKeyReducer = (
  state: PrivateKeyState,
  action: PrivateKeyAction
): PrivateKeyState => {
  switch (action.type) {
    case PrivateKeyActionType.SET_WALLET_ID:
      return { ...state, selectedWalletId: action.payload };
    case PrivateKeyActionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    case PrivateKeyActionType.TOGGLE_PASSWORD_VISIBILITY:
      return { ...state, showPassword: !state.showPassword };
    case PrivateKeyActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case PrivateKeyActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case PrivateKeyActionType.REVEAL_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.payload,
        showPrivateKey: true,
        error: '',
      };
    case PrivateKeyActionType.HIDE_PRIVATE_KEY:
      return {
        ...state,
        privateKey: '',
        showPrivateKey: false,
        password: '',
        selectedWalletId: '',
        error: '',
        copiedPrivateKey: false,
      };
    case PrivateKeyActionType.SET_COPIED:
      return { ...state, copiedPrivateKey: action.payload };
    case PrivateKeyActionType.RESET_FORM:
      return { ...state, error: '', privateKey: '' };
    default:
      return state;
  }
};
