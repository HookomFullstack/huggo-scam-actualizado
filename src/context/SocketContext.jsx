import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { auth, removeCookie } = useContext( AuthContext )
    const { socket, conectarSocket, desconectarSocket } = useSocket('https://api.huggo-scam.com/', auth)
    
    useEffect(() => {
        if ( auth ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ]);

    useEffect(() => {
        socket?.on('[user] logout', () => {
            if ( socket?.connected == false ) {
                removeCookie('auth')
                desconectarSocket()
            }
        })
    }, [ auth, desconectarSocket ]);

    return (
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    )
}