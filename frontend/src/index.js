import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    // SKELETON -- when store is finished, change render
    let store = configureStore({}); // VK: empty store for now- update to account for session token later!

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
})
