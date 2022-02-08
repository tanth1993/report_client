import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import favicon from '@dev/assets/images/favicon.png';
import { Provider } from 'react-redux'
import store from '@dev/store'

let link: any = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = favicon;

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./App', () => {
        renderApp();
    })
}

