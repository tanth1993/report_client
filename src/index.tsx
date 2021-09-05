import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import logo from './logo.svg';

let link: any = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = logo;

function renderApp() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./App', () => {
        renderApp();
    })
}

