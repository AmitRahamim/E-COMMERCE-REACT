import { legacy_createStore as createStore } from 'redux';  // Create store
import { Provider } from 'react-redux';  // Allow access to Redux state throughout your app
import { PersistGate } from 'redux-persist/integration/react'; // For waiting until state is rehydrated
import { persistStore, persistReducer } from 'redux-persist';  // For persistence
import storage from 'redux-persist/lib/storage'; // This uses localStorage by default
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import UsersReducer from './redux/rootReducer'; // Import your reducer

// 1. Configure redux-persist
const persistConfig = {
  key: 'root',  // The key to store the persisted state
  storage,  // By default, this uses localStorage
  
};

// Wrap your reducer with persistReducer to make the Redux store persistable
const persistedReducer = persistReducer(persistConfig, UsersReducer);

// 2. Create Redux store with the persisted reducer
const store = createStore(persistedReducer);

// 3. Create a persistor to handle rehydrating the persisted state
const persistor = persistStore(store);

// 4. Render the App, wrapping it with the Provider (to give access to Redux store), PersistGate, and BrowserRouter (for routing)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
