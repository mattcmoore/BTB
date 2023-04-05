import React, { createContext, useContext, useState, useEffect } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])
    const [notes, setNotes] = useState([]);
    const [addNewNote, setAddNewNote] = useState(false);

   

    const fetchUrl = 'http://localhost:13000';

    

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch(`${fetchUrl}/notes`);
            const data = await response.json();
            console.log(data);
            setNotes(data);
        };
        fetchNotes();
    }, [])

    const openNoteModal = () => {
        setAddNewNote(true)
    }

    const closeNoteModal = () => {
        setAddNewNote(false)
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
            closeNoteModal
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext