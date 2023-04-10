import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";



const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http://localhost:3000'
    const [classes, setClasses] = useState(['this'])
    const [user, setUser] = useState(null)
    
    const createNewClass = async (formData) => {
        const res = await fetch('http://localhost:3000/createNewClass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.msg === 'Class created') {
          return data.classId;
        } else {
          throw new Error('Failed to create class');
        }
      };

    const login = async (formState) =>{
        const res = await fetch(`${fetchURL}/login`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
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
            login,
            user,
            makeUser,
            logOut,
            createNewClass,
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext