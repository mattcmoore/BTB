// import { useState } from 'react';
import "./StudentDashboardModal.css";
import React, { useState , useContext} from "react";
import BtbContext from '../../context/BtbContext';
import StudentDashboard from './StudentDashboard';




const StudentDashboardModal = ({}) => {
    // const editMode = mode === 'edit' ? true : false;
    const fetchURL = 'http://localhost:3000';

    const { notes, addNewNote, openNoteModal, closeNoteModal, user, fetchNotes } = useContext(BtbContext)
    const [newNote, setNewNote] = useState({
        body: null,
        date: new Date(),
        author: user.userId
    });

    

        //import user from context user.userId
    
    const postNote = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${fetchURL}/notes`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newNote)
            })
            if (response.status === 200) {
                closeNoteModal()
                fetchNotes()
              }
        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        console.log('changing', e)
        const { name, value } = e.target

        setNewNote( newNote => ({
            ...newNote, 
            [name] : value 
        }));
        console.log(newNote)
    };

    return (
        <>
           {addNewNote && (
            <div className='notes-modal-overlay'>
                <div className="notes-modal-container">
                    <div className="notes-modal">
                        <div className="notes-close-btn" onClick={closeNoteModal}>
                            <button>
                                <svg viewBox='0 0 32 32'>  
                                    <path d="m6 6 20 20"></path>
                                    <path d="m26 6-20 20"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="submit-container">
                            <form>
                                <input 
                                    required
                                    placeholder="enter new note"
                                    // className="new-note"
                                    name="body"
                                    value={newNote.body}
                                    onChange={handleChange}
                                />
                                <input type="submit" onClick={postNote} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           )}
        </>
    )
}

export default StudentDashboardModal



