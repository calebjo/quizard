import React from 'react';
import ReactDOM from 'react-dom';

// ADD BACK WHEN WE FILL THE SKELETON
import Root from './components/root'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    ReactDOM.render(<Root />, root)
    // ReactDOM.render(<Root store={store}/>, root)
})
