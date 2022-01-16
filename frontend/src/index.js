import React from 'react';
import ReactDOM from 'react-dom';

// SKELETON -- when store is finished, change render
import Root from './components/root'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    ReactDOM.render(<Root />, root)
    // ReactDOM.render(<Root store={store}/>, root)
})
