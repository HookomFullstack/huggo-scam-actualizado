import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { App } from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';
import { ScamProvider } from './context/ScamContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(  
    <BrowserRouter>
        <AuthProvider>
            <SocketProvider>
                <ScamProvider>
                    <App />
                </ScamProvider>
            </SocketProvider>
        </AuthProvider>
    </BrowserRouter>
)

