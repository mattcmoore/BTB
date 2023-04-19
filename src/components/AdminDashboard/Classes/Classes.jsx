import React, { useContext, useState, useEffect } from 'react';
import BtbContext from '../../../context/BtbContext';
import './Classes.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Classes = () => {
  const { adminModal, setAdminModal } = useContext(BtbContext);
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
              name: item.user_name,
              task_complete: parseInt(item.task_complete),
              total: parseInt(item.total),
              start_date: item.start_date,
              end_date: item.end_date
            });
          } else {
            acc.push({
              mcsp_name: item.mcsp_name,
              user_names: [{
                name: item.user_name,
                task_complete: item.task_complete,
                total: item.total,
                start_date: item.start_date,
                end_date: item.end_date
              }],
            });
          }
          return acc;
        }, []);
        setClasses(groupedData);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
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
            const percentage = item.total !== 0 ? (item.task_complete / item.total) * 100 : 0;
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
                      <div className='item_card' key={j}>
                        <span>
                          <span>{user.name}</span>
                          <span> ({user.task_complete}/{user.total})</span>
                          <div style={{ width: 100, height: 100 }}>
                            <CircularProgressbar
                              value={percentage}
                              text={`${percentage}%`}
                              styles={buildStyles({
                                textSize: '10px',
                              })}
                            />
                          </div>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Classes;
