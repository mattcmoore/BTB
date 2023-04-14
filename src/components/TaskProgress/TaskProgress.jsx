import React, { useEffect, useState } from "react";
import "./TaskProgress.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TaskProgress = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAllusers"); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data)
        if (Array.isArray(data)) {
          const filteredUsers = data.filter(user => !user.admin);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => {
        const percent = (user.completed/user.total) * 100; // Calculate percentage of completed task
        return (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.mscp}</p>
            <div style={{ width: 120, height: 120 }}>
              <CircularProgressbar value={percent} text={`Completed tasks: ${user.completed} out of ${user.total}`} styles={buildStyles({
                textSize: '6px'
              })} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskProgress;
