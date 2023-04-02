import React, { createContext, useContext, useState } from "react";



const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http://localhost:3000'
    const [classes, setClasses] = useState(['this'])
    const [user, setUser] = useState(null)
    
    const login = async (formState) =>{
        const res = await fetch(`${fetchURL}/login`, {
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

    const makeUser = async (formData) =>{
        const res = await fetch(`${fetchURL}/makeStudent`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.msg === 'logged in'){
            setUser(data)
        } else {
            console.log(data.msg)
        }
    }
    

    return(
        <BtbContext.Provider value={{
            classes,
            setClasses,
            login,
            user,
            makeUser,

        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext