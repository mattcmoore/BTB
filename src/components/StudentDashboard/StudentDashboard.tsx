import "./StudentDashboard.css";
import React, { useState } from 'react';

export function StudentChecklist () {

    const checkList = ["Get separation orders", "Turn in gear", "Separation physical", "Separation brief", "Pick up DD214", "Clear installation", "Clear unit"];
    const [checked, setChecked]: Array<any> = useState([]); 
    const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
        let updatedList: Array<any> = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value]
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    }

    return (
        <div className="main-container">
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
                    <ul className="task">
                       {checkList.map((item, index) => (
                        <div className="task-item" key={index}>
                            <input value={item} type="checkbox" onChange={handleCheck} />
                            <span>{item}</span>
                        </div>
                       ))}
                    </ul>
                </div>
            </div>
            <div className="notes-container">
                <h2 className="column-title">
                    Notes
                </h2>
                <div className="notes-section">
                    Input notes here
                </div>
            </div>
        </div>
    )
}

export default StudentChecklist