import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { types } from './types';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const preloadedState = {
  nodes: [
    {
    id: 1,
    title: 'project',
    // expanded: true,
    type: types.cat,
    removable: false,
    children: [
      { 
        id: 2,
        title: 'package.json',
        type: types.dog,
        removable: true,
        children: [],
      },
      {
        id: 3,
        type: types.dog,
        title: 'src',
        // expanded: true,
        removable: true,
        children: [
          {
            id: 4,
            title: 'index.js',
            type: types.cat,
            removable: true,
          }
        ]
      }
    ]
  }
 ],
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});


const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
