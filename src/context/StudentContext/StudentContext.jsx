import { useState, createContext } from 'react';
import StudentDashboard from '../../components/StudentDashboard/StudentDashboard';

const StudentContext = createContext();

export const StudentProvider = ({children}) => {

    const [notes, setNotes] = useState(
        [
            {
                text: 'Gotta layout and clean my gear for turn in. It will take about a week',
                date:'03/21/2023'
            },
            {
                text: 'Need to contact my S1 so I can see if my separation orders have been created yet. I also need to contact my S2 shop to see if I can get read off.',
                date: '02/19/2023'
            },
            {
                text: 'ay baybay',
                date: '02/05/2023'
            }
        ]
    )
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;
    const handleChange = (e) => {
        if(characterLimit-e.target.value.length >= 0) {
            setNoteText(e.target.value)
        }
    }

    const handleSaveClick = () => {
        if(noteText.trim().length > 0) {
            handleAddNote(noteText)
            setNoteText('')
        }
    }

    return(
        <StudentContext.Provider 
            value={{
                handleChange,
                handleAddNote,
                handleSaveClick,
                noteText
             }}
        >
            {children}
        </StudentContext.Provider>
    )
}