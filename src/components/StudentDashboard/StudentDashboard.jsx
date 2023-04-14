import "./StudentDashboard.css";
import React, { useState , useContext, useEffect} from "react";
import BtbContext from '../../context/BtbContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BTBlogo from '../../assets/blue-ocean-logo-2.png';
import StudentDashboardModal from './StudentDashboardModal';


export function StudentChecklist () {
    // const { notes, setNotes } = useContext(BtbContext)

    const fetchURL = 'http://localhost:3000';

    const checkList = ["Prepare transition leave documents", "Arrange transportation and household goods", "Review/update/acquire LES, SGLI, Certifications, and other relevant documents", "Schedule Separation Physical", "Clean and account for gear, schedule turn-in", "Obtain copies of medical records", "Meet with Service Retirement Officer (retirees only)", "Attend out-processing brief", "Submit transition leave form", "Obtain copies of medical and dental records", "Complete Separation physical and Separation Dental Exam", "Obtain separation orders", "Research VA insurance coverage and benefits", "Obtain separation orders and make at least 15 copies for distribution", "Clothing record final review and turn-in", "If taking leave, begin clearing the installation", "Finalize relocation appointments (if applicable)", "Review benefits", "Begin preparations for disability claim (if applicable)", "Review military records", "Finalize unit clearing", "Finalize installation clearing", "Sign and obtain DD-214, store in a safe location", "Establish your local VA centers (emergency and clinic)", "Communicate ETS ceremony with your unit", "Communicate with local VSO", "Contact VA for benefits enrollment/verification"];
    const [startDate, setStartDate] = useState(new Date());
    const [mouseover, setMouseover] = useState(false);

    const { notes, addNewNote, openNoteModal, closeNoteModal, fetchNotes, user, tasks, fetchTasks } = useContext(BtbContext)

    const handleMouseover = () => {
        setMouseover(false)
    }

    useEffect(() => {
        fetchNotes()
        console.log(notes)
    },[])

    useEffect(() => {
        fetchTasks()
        console.log(tasks)
    },[])

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${fetchURL}/notes/${id}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                fetchNotes()
                console.log('successfully deleted')
            }
        } catch(err) {
            console.error(err)
        }
    }
    const [checked, setChecked] = useState([]); 
    const handleCheck = async (e, id) => {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
            e.target.parentNode.style.color = "green";
        } else {
            updatedList.splice(checked.indexOf(id), 1);
            e.target.parentNode.style.color = "black";
        }
        setChecked(updatedList);

        try {
            const response = await fetch(`${fetchURL}/tasks/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                checked: e.target.checked,
              }),
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error:", error);
          }
    }

    const editTask = async (id) => {
        e.preventDefault()

        try {
            const response = await fetch(`${fetchURL}/tasks/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    checked: value
                }),
            })
            if(!response.status === 200) {
                throw new Error('Did not hit')
            }
            const data = await response.json();
            console.log(data)
        } catch(err) {
            console.error(error)
        }
    }

    function formatDate(dateString) {
        // Convert the 'yyyy-mm-dd' string to a Date object
        const date = new Date(dateString);
      
        // Array of month names for formatting
        const monthNames = [
           'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        // Extract the day, month, and year from the Date object
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
      
        // Format the date as 'dd mmm yyyy'
        return `${day} ${month} ${year}`;
      }

      function daysLeft(dateString) {
        // Convert the 'yyyy-mm-dd' string to a Date object
        const targetDate = new Date(dateString);
      
        // Get the current date and time
        const now = new Date();
      
        // Set the time portion of the current date to 0 (midnight)
        now.setHours(0, 0, 0, 0);
      
        // Calculate the difference in milliseconds between the two dates
        const differenceInMilliseconds = targetDate - now;
      
        // Convert the difference to days
        const days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      
        return days;
      }

      const colorItem = (item, days) =>{
        if(checked.includes(item)){
         return 'checked'
        } else {
         if(60 >= days && days >= 14){
         return 'yellow'
         } /*else if (14 > days){
         return 'red'
         }*/ else {
         return ''
         }
        }
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
                            <p className="student-dropdown-avatar">CD</p>
                            <p>Student Name</p><p><svg className="triangle" viewBox="0 0 232.72 115"><path className="cls-1" d="M116.02,120.76L1.17,.5H230.88L116.02,120.76Z"/></svg></p>
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
                            {user.name}
                        </h3>
                        <h3 
                            id="branch"
                            className="student-info"
                        >
                            Branch: Army
                        </h3>
                        <h3 
                            id="sep-date"
                            className="student-info"
                        >
                            Separation Date: 06 June 2023
                        </h3>
                    </div>
                    <div className="checklist-container">
                        <ul className="task">
                        {tasks.map((item, index) => (
                            <div className="task-item-container">
                                <div className="list-pop">
                                    <div className="task-item" key={index}>
                                        <input value={item} type="checkbox" onChange={(e) => handleCheck(e, item.id)}  />
                                        <span className={checked.includes(item) ? 'checked' : (daysLeft(item.due) <= 14 ? 'red' : daysLeft(item.due) <= 30 ? 'yellow' : '')}>{item.task}</span>
                                        {/* className={checked.includes(item) ? 'checked' : ''} */}
                                        {/* checked.includes(item) ? 'checked' : (daysLeft(item.due) <= 14 ? 'red' : daysLeft(item.due) <= 30 ? 'yellow' : '') */}
                                    </div>
                                </div>
                                <div className="due-date">
                                    Date due: {formatDate(item.due)}
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
                                        {/* <button className="edit">Edit</button> */}
                                        <div className="delete" onClick={() => deleteNote(note.id)}><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title><path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"></path></svg></div>
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