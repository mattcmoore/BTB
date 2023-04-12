import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";



const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http://localhost:3000'
    const [classes, setClasses] = useState(['this'])
    const [user, setUser] = useState(null)
    
    const createNewClass = async (formData) => {
        const res = await fetch(`${fetchURL}/createNewClass`, {
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
        console.log(data);
        if(data.msg === 'Email or password does not exist'){
            console.log('Make alert')
        } else {
            localStorage.setItem('jwt', data.token)
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
        //checkToken()
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
            fetchURL
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext