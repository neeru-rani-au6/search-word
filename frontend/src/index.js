import React from 'react';
import ReactDOm from 'react-dom';
import App from './app';
import './style/style.css';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOm.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root"));