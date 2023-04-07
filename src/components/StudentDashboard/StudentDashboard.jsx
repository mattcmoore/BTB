import "./StudentDashboard.css";
import React, { useState , useContext, useEffect} from "react";
import BtbContext from '../../context/BtbContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BTBlogo from '../../assets/blue-ocean-logo-2.png';
import StudentDashboardModal from './StudentDashboardModal';


export function StudentChecklist () {
    // const { notes, setNotes } = useContext(BtbContext)

    const checkList = ["Get separation orders", "Turn in gear", "Separation physical", "Separation brief", "Pick up DD214", "Clear installation", "Clear unit"];
    const [startDate, setStartDate] = useState(new Date());
    const [mouseover, setMouseover] = useState(false);

    const { notes, addNewNote, openNoteModal, closeNoteModal, fetchNotes } = useContext(BtbContext)

    const handleMouseover = () => {
        setMouseover(false)
    }

    useEffect(() => {
        fetchNotes()
    },[])



    const [checked, setChecked] = useState([]); 
    const handleCheck = (e) => {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value]
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    }



    return (
        <div className="main-container">
            <div className="navbar-main-container">
                    <div className="student-navbar-container" onMouseLeave={()=>setMouseover(false)}>
                    <div className="student-navbar-buttons">
                        <img className="student-navbar-logo" src={BTBlogo}></img>
                        <div><span className="student-classes-btn"></span></div>
                        <div><span className="student-btn"></span></div>
                        <div><span className="student-archives-btn"></span></div>
                    </div>
                    <div className={`student-dropdown ${mouseover ? 'mouseover' : ''}`}>
                        <div className="student-dropdown-btn" onMouseEnter={()=>setMouseover(true)}>
                            <p className="student-dropdown-avatar">AA</p>
                            <p>Student Name</p><p>triangle</p>
                        </div>
                        <div className={mouseover ? 'student-dropdown-account' : 'hidden' }>
                            <p>MY ACCOUNT</p>
                            <p>email address</p>
                        </div>
                        <div className={mouseover ? 'student-dropdown-sign-out' : 'hidden'}>SIGN OUT</div>
                    </div>
                </div>
            </div>
            <div className="student-container">
                <div className="outprocessing-container">
                    <h2 className="column-title">
                        Outprocessing Progress
                    </h2>
                    <div className="student-section">
                        <h3 
                            id="student-name"
                            className="student-info"
                        >
                            First Last
                        </h3>
                        <h3 
                            id="branch"
                            className="student-info"
                        >
                            Branch
                        </h3>
                        <h3 
                            id="sep-date"
                            className="student-info"
                        >
                            Separation Date: Date
                        </h3>
                    </div>
                    <div className="checklist-container">
                        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/> */}
                        <ul className="task">
                        {checkList.map((item, index) => (
                            <div className="task-item-container">
                                <div className="list-pop">
                                    <div className="task-item" key={index}>
                                        <input value={item} type="checkbox" onChange={handleCheck} />
                                        <span>{item}</span>
                                    </div>
                                </div>
                                <div className="due-date">
                                    Date due:
                                    <div className="calendar-container">
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                                    </div>
                                </div>

                            </div>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="notes-container">
                    <div className="header-btn">
                        <h2 className="column-title" id="notes-title">
                            Notes
                        </h2>
                        <div className="new-note" onClick={openNoteModal}>
                            <div className="note-btn">
                                New note
                            </div>
                        </div>
                    </div>
                    <div className="notes-section">
                        {/* <form onSubmit={handleSubmit}>
                            <input type="text" value={text} onChange={handleChange} />
                            <input type="text" />
                        </form> */}
                        <div className="note-container">
                            {notes.map((note) => (
                                <div className="note-item">
                                    <p>
                                        <span className="note-actual">{note.body}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {addNewNote && (<StudentDashboardModal/>)}
        </div>
    )
}

export default StudentChecklist