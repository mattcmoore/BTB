import React, { createContext, useContext, useState, useEffect } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])
    const [adminModal, setAdminModal] = useState('classes')
    const [admins, setAdmins] = useState([])

    const fetchUrl = 'http://localhost:3000';

    const getAdmins = async () => {
        const res = await fetch(`${fetchUrl}/admins`)
        const data = await res.json()
        setAdmins(data)
    }
    
    useEffect(()=>{
        // should be set to 'classes' in production
        setAdminModal('admins')
        getAdmins()
    },[])

    return(
        <BtbContext.Provider value={{
            classes,
            setClasses,
            adminModal,
            setAdminModal,
            admins
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext