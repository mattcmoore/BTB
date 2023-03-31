import React, { createContext, useContext, useState } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])
    const [adminModal, setAdminModal] = useState('classes')

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