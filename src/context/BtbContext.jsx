import React, { createContext, useContext, useState, useEffect } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])
    const [adminModal, setAdminModal] = useState('classes')

    useEffect(()=>{
        // should be set to 'classes' in production
        setAdminModal('admins')
    },[])

    return(
        <BtbContext.Provider value={{
            classes,
            setClasses,
            adminModal,
            setAdminModal,
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext