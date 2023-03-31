import React, { createContext, useContext, useState } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])


    return(
        <BtbContext.Provider value={{
            classes,
            setClasses
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext