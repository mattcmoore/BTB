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
    }
    const [adminUpdate, setAdminUpdate] = useState({})
    const [newAdmin, setNewAdmin] = useState(emptyAdmin)
    const [user, setUser] = useState(null)

    const fetchUrl = 'http://localhost:3000';

    const getAdmins = async () => {
        const res = await fetch(`${fetchUrl}/admins`)
        const data = await res.json()
        console.log(data);
        if(data.msg === 'Email or password does not exist'){
            console.log('Make alert')
        } else {
            localStorage.setItem('jwt', data.token)
            setUser(data)
        }
        setAdmins([...data])
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

    const updateAdmin = async (update) => {
        const req = update
        const res = await fetch(`${fetchUrl}/updateAdmin`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)})
            getAdmins()
            setAdminUpdate({})
        }
    const logOut = async () =>{
        await fetch(`${fetchURL}/logOut`, {
            method: 'GET'
        })
        setUser(null)
    }

    const checkToken = async () =>{
        const token = localStorage.getItem('jwt')
        const jwt = await token
        const res = await fetch(`${fetchURL}/checkToken`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jwt)
        })
        console.log(await res.json());
        console.log(data)
        if(data.msg === 'Success'){
            setUser(data)
        } else {
            console.log(data);
        }
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
            updateAdmin,
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext