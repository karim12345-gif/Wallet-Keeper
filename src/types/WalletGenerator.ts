// Action types enum
// eslint-disable-next-line no-unused-vars
enum WalletFormActionType {
    SET_PASSWORD = 'SET_PASSWORD',
    SET_WALLET_NAME = 'SET_WALLET_NAME',
    TOGGLE_PASSWORD_VISIBILITY = 'TOGGLE_PASSWORD_VISIBILITY',
    SET_ERROR = 'SET_ERROR',
    CLEAR_ERROR = 'CLEAR_ERROR',
    RESET_FORM = 'RESET_FORM',
  }
  
  // Local state interface
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
  
  // Reducer function
  const walletFormReducer = (state: WalletFormState, action: WalletFormAction): WalletFormState => {
    switch (action.type) {
      case WalletFormActionType.SET_PASSWORD:
        return { ...state, password: action.payload, error: '' }; 
      case WalletFormActionType.SET_WALLET_NAME:
        return { ...state, walletName: action.payload };
      case WalletFormActionType.TOGGLE_PASSWORD_VISIBILITY:
        return { ...state, showPassword: !state.showPassword };
      case WalletFormActionType.SET_ERROR:
        return { ...state, error: action.payload };
      case WalletFormActionType.CLEAR_ERROR:
        return { ...state, error: '' };
      case WalletFormActionType.RESET_FORM:
        return { ...initialState };
      default:
        return state;
    }
  };


  export  {walletFormReducer, WalletFormActionType, initialState}
  export type { WalletFormAction, WalletFormState,}