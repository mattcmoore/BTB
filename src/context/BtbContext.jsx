import React, { createContext, useContext, useState, useEffect } from "react";


const BtbContext = createContext()

export const BtbProvider = ({children}) =>{
    const [classes, setClasses] = useState(['this'])
    const [notes, setNotes] = useState([]);

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

    return(
        <BtbContext.Provider value={{
            classes,
            setClasses, 
            notes,
            setNotes
        }}>
            {children}
        </BtbContext.Provider>
    )
}
export default BtbContext