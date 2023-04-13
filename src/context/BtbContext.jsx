import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode" 


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
        if(data.msg === 'Email or password does not exist'){
            console.log('Make alert')
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
        const login = async (formState) => {
            const res = await fetch(`${fetchURL}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formState),
            });
            const data = await res.json();
            console.log(data);
            if (data.msg === "Email or password does not exist") {
              console.log("Make alert");
            } else {
              localStorage.setItem("jwt", data.token);
              setUser(data);
            }
          };
        
          const makeUser = async (formData) => {
            const res = await fetch(`${fetchURL}/makeStudent`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.msg === "logged in") {
              setUser(data);
            } else {
              console.log(data.msg);
            }
          };
        
          const logOut = async () => {
            localStorage.clear("jwt");
            setUser(null);
          };
        
          const checkToken = async () => {
            const token = localStorage.getItem("jwt");  
            if(token){
                const decoded = jwtDecode(token);
                setUser(decoded)
            }  
          };
        
          useEffect(() => {
            checkToken();
          }, []);
        
          function clearTokenOnExpiration(token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                const remainingTime = (decoded.exp - currentTime) * 1000;
            
                const timer = setTimeout(() => {
                  localStorage.clear('jwt');
                  console.log('JWT token cleared from local storage');
                }, remainingTime);
            
                // Return a function to clear the timer
                return () => clearTimeout(timer);
              } catch (error) {
                console.error('Invalid JWT:', error);
              }
          }
        
          useEffect(() => {
            const token = localStorage.getItem("jwt");
            if (token) {
              const cleanUp = clearTokenOnExpiration(token);
              return cleanUp
            }
          },[]);
    
    useEffect(()=>{
        // should be set to 'classes' in production
        setAdminModal('admins')
        getAdmins()
    },[])

    return(
        <BtbContext.Provider value={{
            classes,
            logOut,
            login,
            user,
            fetchURL,
            makeUser,
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