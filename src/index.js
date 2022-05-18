import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import client from './apollo_client';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

