import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContent } from './components/AppContent';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
