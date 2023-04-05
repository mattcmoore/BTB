import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";



const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http://localhost:3000'
    const [classes, setClasses] = useState(['this'])
    const [adminModal, setAdminModal] = useState('classes')
    const [admins, setAdmins] = useState([])
    const emptyAdmin = {
        name: "",
        email: "",
        password: "",
        admin: true,
    }
    const [adminUpdate, setAdminUpdate] = useState({})
    const [newAdmin, setNewAdmin] = useState(emptyAdmin)

    const fetchUrl = 'http://localhost:3000';

    const getAdmins = async () => {
        const res = await fetch(`${fetchUrl}/admins`)
        const data = await res.json()
        setAdmins(data)
    }

    const makeAdmin = async (admin) => {
        const req = admin
        const res = await fetch(`${fetchUrl}/makeAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)})
        console.log(res.msg.json())
        getAdmins()
        setNewAdmin(emptyAdmin)
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
            admins,
            newAdmin,
            setNewAdmin,
            makeAdmin,
            adminUpdate,
            setAdminUpdate,
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext