import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes';
import { Auth0Provider } from './contexts/auth0-context';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore'

const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

ReactDOM.render(
  <Auth0Provider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Auth0Provider>,

  document.getElementById('root')
);
