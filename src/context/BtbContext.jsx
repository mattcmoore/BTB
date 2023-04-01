import React, { createContext, useContext, useState } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http:'
    const [classes, setClasses] = useState(['this'])
    const [user, setUser] = useState(null)
    
    const login = async (formState) =>{
        const res = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await res.json()
        if(data.msg === 'Email or password does not exist'){
            console.log('Make alert')
        } else {
            setUser(data)
        }
    }

    return(
        <BtbContext.Provider value={{
            classes,
            setClasses,
            login,
            user
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext