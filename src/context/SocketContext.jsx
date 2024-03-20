import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { auth, removeCookie } = useContext( AuthContext )
    const { socket, conectarSocket, desconectarSocket } = useSocket(window.location.href.includes('localhost') ? 'http://localhost:3001' : 'https://api.huggopanel.com', auth)
    
    useEffect(() => {
        if ( auth ) conectarSocket()
    }, [ auth, conectarSocket ]);

    useEffect(() => {
        socket?.on('[user] logout', () => {
            removeCookie('auth')
            desconectarSocket()
        })
    }, [ auth, desconectarSocket ]);

    return (
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    )
}