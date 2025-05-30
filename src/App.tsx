import React, {  useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadWallets, clearError } from './store/slices/walletSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { WalletGenerator } from './components/WalletGenerator';
import { WalletList } from './components/WalletList';
import { PrivateKeyViewer } from './components/PrivateKeyViewer';
import { BalanceDemo } from './components/BalanceDemo';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(loadWallets());
  }, [dispatch]);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Wallet Keeper
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            You can generate and manage your EVM-compatible wallets securely
          </p>
          
        
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
              <button
                onClick={() => dispatch(clearError())}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <WalletGenerator />
          <BalanceDemo/>
          <WalletList />
          <PrivateKeyViewer />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;