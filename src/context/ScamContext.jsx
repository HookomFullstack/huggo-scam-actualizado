import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";

export const ScamContext = createContext()

let primeraVez = true 

export const ScamProvider = ({children}) => {

    const { socket }  = useContext(SocketContext)
    const [ bags, setBags ] = useState([])
    const [bagFiltered, setBagFiltered] = useState(bags)

    const [selected, setSelected] = useState([])

    const [notification, setNotification] = useState(false)

    const bankSelected = () => selected.filter(e => e?.selected === true)[0]?.nameBank
    
    // ESTO OBTIENE TODOS LOS USUARIOS SIEMPRE Y CUANDO ESTE CONECTADO EL SERVER
    useEffect(() => {

        if(socket != null) socket.on('[bag] getBag', (bags) => setBags(bags))
        
        return () => {
            socket?.off('[bag] getBag')
        }
    }, [socket])

    
  
    useEffect(() => {
      setBagFiltered(bags.filter(e => e?.nameBank == bankSelected() ))
    }, [selected, bags, socket])
    
    useEffect(() => {
        socket?.on('[bag] newBag', (bag) => {
            const verifyExist = bags.filter(e => e._id == bag._id)
            if (verifyExist.length == 0) {
                setBags([...bags, bag])
                if(bag.nameBank == bankSelected()) return setNotification(true)
                return
            } 

            if(bankSelected() == verifyExist[0].nameBank) {
                setBags( bags.map( e => e._id === bag._id ? e = bag : e ) )
                if(verifyExist[0].online == bag.online || verifyExist[0].isLiveLoading != bag.isLiveLoading ) return setNotification(true)
                
            }

            return setBags(bags.map( e => e._id === bag._id ? e = bag : e ))
        })
        return () => {
            socket?.off('[bag] newBag')
        };
    }, [socket, bags, selected])

    // MANEJA EL SELECTOR DE USUARIOS
    useEffect(() => {

        const itemsSelected = bags?.reduce( (acc, {nameBank}) => {
            if(!acc.includes(nameBank)) acc.push(nameBank)
            return acc
        }, [])?.map( ( e, i ) => e = { nameBank: e, selected: i == 0 ? true : false})

        if(itemsSelected.length != selected.length) setSelected( 
            selected.length != 0 
            ? [...selected, itemsSelected[itemsSelected.length - 1]] 
            : itemsSelected)
        
    }, [bags, selected])

    

    const filteredSelected = (newSelected) => {
        
        setSelected(arrBank => 

            arrBank.map( 
                (e) => e.nameBank == newSelected 
                    ? e = {nameBank: e.nameBank, selected: true} 
                    : e = {nameBank: e.nameBank, selected: false}  
            )
            
        )

    }

    return (
        <ScamContext.Provider value={{ 
            socket, 
            selected, 
            filteredSelected, 
            bags: bagFiltered, 
            notification, 
            setNotification
        }}>
            {children}
        </ScamContext.Provider>
    )
}
