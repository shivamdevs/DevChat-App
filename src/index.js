import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { tippy } from '@tippyjs/react';

tippy.setDefaultProps({
    arrow: false,
    animation: "shift-away",
    delay: [200, 0],
    theme: 'tippy-theme',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
        <Toaster position="bottom-center" />
    </React.StrictMode>
);