import { useReducer } from 'react';
import { initialState, walletFormReducer } from '../reducer/walletFormReducer';
import { walletFormActions } from '../actions/walletFormActions';

export const useWalletForm = () => {
  const [state, dispatch] = useReducer(walletFormReducer, initialState);

  const actions = {
    setPassword: (password: string) =>
      dispatch(walletFormActions.setPassword(password)),
    setWalletName: (name: string) =>
      dispatch(walletFormActions.setWalletName(name)),
    togglePasswordVisibility: () =>
      dispatch(walletFormActions.togglePasswordVisibility()),
    setError: (error: string) => dispatch(walletFormActions.setError(error)),
    clearError: () => dispatch(walletFormActions.clearError()),
    resetForm: () => dispatch(walletFormActions.resetForm()),
  };

  return {
    state,
    actions,
  };
};
