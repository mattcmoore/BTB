// import { useState } from 'react';
import "./StudentDashboardModal.css";
import React, { useState , useContext} from "react";
import BtbContext from '../../context/BtbContext';
import StudentDashboard from './StudentDashboard';




const StudentDashboardModal = ({}) => {
    // const editMode = mode === 'edit' ? true : false;
    const fetchUrl = 'http://localhost:13000';

    const { notes, addNewNote, openNoteModal, closeNoteModal, user } = useContext(BtbContext)
    const [newNote, setNewNote] = useState({

    })

        //import user from context user.userId
    
    const postNote = async (e) => {
        e.preventDefault()
        try {
            response = await fetch(`${fetchUrl}/notes`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "body": `${body}`,
                    "date": `${date}`,
                    "author": `${user.userId}`
                })
            })
        } catch(err) {
            console.log(err)
        }
    }

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
                                <input type="text" />
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



