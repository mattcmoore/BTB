import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
  const fetchURL = 'http://localhost:3000'
  const [classes, setClasses] = useState(['this']);
  const [ notes, setNotes ] = useState([]);
  const [ addNewNote, setAddNewNote ] = useState(false);
  const [user, setUser] = useState(null);
  const [ tasks, setTasks ] = useState([]);
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
    const [ chatSessions, setChatSessions ] = useState([])
    const [individualUser, setIndividualUser] = useState([])
    const [ openStudentInterface, setOpenStudentInterface ] = useState(false)


  const fetchNotes = async (id) => {
    const response = await fetch(`${fetchURL}/notes/${id}`);
    const data = await response.json();
    setNotes(data);
    console.log(notes)
  };

  const fetchTasks = async (id) => {
    const response = await fetch(`${fetchURL}/tasks/${id}`);
    const data = await response.json();
    setTasks(data);
    console.log(tasks);
  }
  
  const fetchIndividualUser = async (id) => {
      const response = await fetch(`${fetchURL}/users/${id}`)
      const data = await response.json();
      setIndividualUser(data[0])
      console.log(individualUser)
    }
    
    const openStudentModal = (event) => {
        const id = event.target.getAttribute('name')
        fetchIndividualUser(id)
        fetchTasks(id)
        fetchNotes(id)
        setOpenStudentInterface(true)
    }

  const openNoteModal = () => {
      setAddNewNote(true)
  }

  const closeNoteModal = () => {
      setAddNewNote(false)
  }


  const closeStudentModal = () => {
    setOpenStudentInterface(false)
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
          chatSessions,
          setChatSessions,
          updateAdmin,
          deleteAdmin,
          individualUser,
          fetchIndividualUser,
          openStudentInterface,
          setOpenStudentInterface,
          openStudentModal,
          closeStudentModal,
        }}>
            {children}
        </BtbContext.Provider>
    )
  }

export default BtbContext