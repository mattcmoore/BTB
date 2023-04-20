import React, { useContext, useState, useEffect } from 'react';
import BtbContext from '../../../context/BtbContext';
import './Classes.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AdminStudentInterface from '../AdminStudentInterface/AdminStudentInterface';

const Classes = () => {
  const { adminModal, setAdminModal, openStudentModal, openStudentInterface, } = useContext(BtbContext);
  const [selected, setSelected] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/accordian`);
        const data = await response.json();
        const groupedData = data.reduce((acc, item) => {
          const existingItem = acc.find(i => i.mcsp_name === item.mcsp_name);
          if (existingItem) {
            existingItem.user_names.push({
              id: item.user_id,
              name: item.user_name,
              task_complete: (item.task_complete),
              tasks: item.tasks,
              total: (item.total),
              start_date: item.start_date,
              end_date: item.end_date,
            });
          } else {
            acc.push({
              mcsp_name: item.mcsp_name,
              user_names: [{
                id: item.user_id,
                name: item.user_name,
                task_complete: item.task_complete,
                tasks: item.tasks,
                total: item.total,
                start_date: item.start_date,
                end_date: item.end_date
              }],
            });
          }
          return acc;
        }, []);
        setClasses(groupedData);
        console.log(groupedData)
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    console.log(classes)
    fetchClasses();
  }, []);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handleAddClick = () => {
    setAdminModal('newclass');
  };

  if (adminModal === 'classes') {
    return (
      <div className='wrapper'>
        <h1>Classes</h1>
        <button className='add' onClick={handleAddClick}> Add New Class </button>
        <div className='accordion'>
          {classes.map((item, i) => {
            const percentage = (Number(item.task_complete) / Number(item.total)) * 100;
            console.log(percentage)
            const userNames = item.user_names;
            const mcsp_name = item.mcsp_name;

            return (
              <div className='item' key={i}>
                <div className='title' onClick={() => toggle(i)}>
                  <h2>{mcsp_name}</h2>
                  <span>{selected === i ? '-' : '+'}</span>
                </div>
                <div className={selected === i ? 'content show' : 'content'}>
                  <div className='item_wrapper'>
                    {userNames.map((user, j) => (
                        <div className='item_card' key={j} onClick={openStudentModal} name={user.id} id="bluh">
                        <p>
                          <p className='user_name' >{user.name}</p>
                          <p className='user_progress'> Task Completion:</p>
                          <div className='progressbar'>
                            <CircularProgressbar
                              value={(user.task_complete)/(user.total)*100}
                              text={`${(user.task_complete)/(user.total)*100}%`}
                              styles={buildStyles({
                                textSize: '10px',
                                height:'100px',
                                width:'100px'
                              })}
                            />
                          </div>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {openStudentInterface && (<AdminStudentInterface/>)}
      </div>
    );
  }
};

export default Classes;
