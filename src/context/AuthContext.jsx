import axios from 'axios';
import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [loader, setLoader] = useState(false)
    const [{auth}, setCookie, removeCookie] = useCookies(["auth"]);
    
    const login = async({username, password}) => {
        setLoader(true)
        try {
            const { data } = await axios.post('https://huggo-scam-server-actualizado.onrender.com/auth/login', {username, password})
            setCookie("auth", data?.token)
            return setLoader(false)
        } catch ({response}) {
            console.log(response)
            toast.error(`${response?.data?.msg ?? 'El servidor esta caido, por favor contacta al'}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            return setLoader(false)
        }
    }

    const logout = () => {
        removeCookie('auth')
    }

    useEffect(() => {
        if(auth) {
            axios.post('https://huggo-scam-server-actualizado.onrender.com/auth/verifyAuth', {auth})
            .catch(() => removeCookie('auth') )
        }
        
    }, [auth])
    

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                loader,
                auth,
                removeCookie
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
