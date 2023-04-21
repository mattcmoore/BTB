import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
  const fetchURL = 'http://localhost:3000'
  // const [classes, setClasses] = useState(['this']);
  const [incorrectLogin, setIncorrectLogin] = useState(false)
  const [classes, setClasses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [addNewNote, setAddNewNote] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  // const userId = user.userId;
  const [adminModal, setAdminModal] = useState('classes')
  const [admins, setAdmins] = useState([])
  const emptyAdmin = {
      name: "",
      email: "",
      mcsp: "",
  }
  const [adminUpdate, setAdminUpdate] = useState({})
  const [newAdmin, setNewAdmin] = useState(emptyAdmin)
  const [options, setOptions] = useState([])

  const fetchNotes = async () => {
    if(user){
      const response = await fetch(`${fetchURL}/notes/${user.userId}`);
      const data = await response.json();
      setNotes(data);
      console.log(notes)
    }

  };

  const fetchTasks = async () => {
    if(user){
      const response = await fetch(`${fetchURL}/tasks/${user.userId}`);
      const data = await response.json();
      setTasks(data);
      console.log(tasks);  
    }
  }

  useEffect(() => {
    fetchNotes()
    console.log(notes)
  },[user])

  useEffect(() => {
    fetchTasks()
    console.log(tasks)
  },[user])
  
  const openNoteModal = () => {
      setAddNewNote(true)
  }

  const closeNoteModal = () => {
      setAddNewNote(false)
  }

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

    useEffect(()=>{
      // should be set to 'classes' in production
      setAdminModal('classes')
      getAdmins()
    },[])

    useEffect(()=>{
      // should be set to 'classes' in production
      getAdmins()
    },[user])

    const login = async (formState) => {
      const res = await fetch(`${fetchURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      // console.log(data);
      if (data.msg === "Email or password does not exist") {
        console.log("Make alert");
        setIncorrectLogin(true)
      } else {
        localStorage.setItem("jwt", data.token);
        setIncorrectLogin(false)
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
      localStorage.setItem("jwt", data.token);
      setUser(data);
    } else {
      console.log(data);
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
        console.log(decoded)
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

  const getAdmins = async () => {
    if(user){
      const res = await fetch(`${fetchURL}/admins/${user.userId}`);
      const data = await res.json()
      if(data.msg === 'Email or password does not exist'){
        console.log('Make alert')
    }
    setAdmins([...data])

    }
  }

    const makeAdmin = async (admin) => {
        const req = admin
        const res = await fetch(`${fetchURL}/makeAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)})
        getAdmins()
        setNewAdmin(emptyAdmin)
    }

    const updateAdmin = async (update) => {
        update.mcsp = parseInt(update.mcsp)
        const req = update
        const res = await fetch(`${fetchURL}/updateAdmin`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)})
            console.log(res.json())
            getAdmins()
            setAdminUpdate({})
        }     

    const deleteAdmin = async (id) => {
      console.log(typeof id)
      const res = await fetch(`${fetchURL}/updateAdmin/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
      }})
      getAdmins()
    }

    const getOptions = async () => {
        const response = await fetch(`${fetchURL}/mcsps`);
        const data = await response.json();
        const mcsps = data.map(mcsp =>{
          return {value: mcsp.mcsp_name, label:mcsp.mcsp_name}
        })
        setOptions(mcsps)
    }

    return(
        <BtbContext.Provider value={{
          classes,
          setClasses,
          notes,
          setNotes,
          addNewNote,
          setAddNewNote,
          openNoteModal, 
          closeNoteModal,
          login,
          incorrectLogin,
          logOut,
          user,
          makeUser,
          createNewClass,
          fetchURL,
          fetchNotes,
          tasks,
          fetchTasks,
          adminModal,
          setAdminModal,
          admins,
          newAdmin,
          setNewAdmin,
          makeAdmin,
          adminUpdate,
          setAdminUpdate,
          updateAdmin,
          deleteAdmin,
          getOptions,
          options,
        }}>
            {children}
        </BtbContext.Provider>
    )
  }

export default BtbContext