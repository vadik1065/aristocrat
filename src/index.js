import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store/index.js";
import './utils/i18n.js';
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from 'react-i18next';
const i18n = i18next.use(initReactI18next);



ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
