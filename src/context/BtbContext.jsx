import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const fetchURL = 'http://localhost:3000';
    const [classes, setClasses] = useState(['this']);
    const [notes, setNotes] = useState([]);
    const [addNewNote, setAddNewNote] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    // const userId = user.userId;

    const fetchNotes = async () => {
        const response = await fetch(`${fetchURL}/notes/${user.userId}`);
        const data = await response.json();
        setNotes(data);
        console.log(notes)
    };

    const fetchTasks = async () => {
        const response = await fetch(`${fetchURL}/tasks/${user.userId}`);
        const data = await response.json();
        setTasks(data);
        console.log(tasks);
    }

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
            user,
            makeUser,
            logOut,
            createNewClass,
            fetchURL,
            fetchNotes,
            tasks,
            fetchTasks,
        }}>
            {children}
        </BtbContext.Provider>
    )
  }

export default BtbContext