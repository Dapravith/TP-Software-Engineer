import 'chart.js/auto';
import './styles/admin-dashboard/admin-dashboard.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Switch from './components/Switch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <App />
    <Switch />
    </>
);