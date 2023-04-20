import React, { useContext, useState, useEffect } from 'react';
import BtbContext from '../../../context/BtbContext';
import './Classes.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Classes = () => {
  const { adminModal, setAdminModal } = useContext(BtbContext);
  const [selected, setSelected] = useState(null);
  const [classes, setClasses] = useState([]);
  const [deletedMcspNames, setDeletedMcspNames] = useState([]);
  

  const handleDeleteClick = async (mcspName) => {
    try{
      const response = await fetch(`http://localhost:3000/accordian/${mcspName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setDeletedMcspNames([...deletedMcspNames, mcspName]);
      }
    } catch (err) {
      console.error('Error deleting class:', err);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/accordian`);
        const data = await response.json();
        const allMcspNames = [...new Set(data.map(item => item.mcsp_name))];
        const groupedData = allMcspNames.map(mcspName => ({
          mcsp_name: mcspName,
          user_names: [],
        }));
        data.forEach(item => {
          const group = groupedData.find(g => g.mcsp_name === item.mcsp_name);
          if (group) {
            group.user_names.push({
              name: item.user_name,
              task_complete: item.task_complete,
              total: item.total,
              start_date: item.start_date,
              end_date: item.end_date,
            });
          }
        });
        setClasses(groupedData);
        console.log(groupedData);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    fetchClasses();
  }, [deletedMcspNames]);
  

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  if (adminModal === 'classes') {
    const handleAddClick = () => {
      setAdminModal('newclass')
      console.log(adminModal)
    }
    return (
      <div className='wrapper'>
        <div className='btn_wrapper'>
          <div className='title_wrapper'>
            <h1 className='title'>Current Classes</h1>
          </div>
        <h3 className='description'>View all student's task progress</h3>
        </div>
        <div>
        <button className='btb-btn' onClick={handleAddClick}> Add New Class </button>
        </div>
        <div className='accordion'>
          {classes.map((item, i) => {
            const userNames = item.user_names;
            const mcsp_name = item.mcsp_name;

            return (
              <div className='item' key={i}>
                <div className='class' onClick={() => toggle(i)}>
                  <h2>{mcsp_name}</h2>
                  <svg className="trashcan" onClick={handleDeleteClick(mcsp_name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-4.992 0-10 1.242-10 3.144 0 .406 3.556 18.488 3.633 18.887 1.135 1.313 3.735 1.969 6.334 1.969 2.601 0 5.199-.656 6.335-1.969.081-.404 3.698-18.468 3.698-18.882 0-2.473-7.338-3.149-10-3.149zm0 1.86c4.211 0 7.625.746 7.625 1.667 0 .92-3.414 1.667-7.625 1.667s-7.625-.746-7.625-1.667 3.414-1.667 7.625-1.667zm4.469 19.139c-.777.532-2.418 1.001-4.502 1.001-2.081 0-3.721-.467-4.498-.998l-.004-.021c-1.552-7.913-2.414-12.369-2.894-14.882 3.55 1.456 11.304 1.455 14.849-.002-.868 4.471-2.434 12.322-2.951 14.902zm-7.872-7.418l-.492-.323 1.824-.008.78 1.667-.506-.32c-.723 1.146-1.027 1.764-.796 2.481-1.823-1.798-1.622-2.182-.81-3.497zm.622-1.304l.781-1.418c.195-.38 1.251-.075 1.688.899l-.797 1.445-1.672-.926zm2.673 5.175h-1.729c-.427.013-.672-1.061-.031-1.915h1.761v1.915zm.058-4.886l.524-.289c-.652-1.188-1.044-1.753-1.781-1.898 2.451-.729 2.593-.41 3.445.981l.521-.275-.79 1.654-1.919-.173zm3.059.005l.911 1.474c.236.355-.546 1.129-1.607 1.035l-.928-1.501 1.624-1.008zm-1.549 4.846l-.004.583-1.028-1.616 1.054-1.47-.006.6c1.354.011 2.037-.055 2.524-.63-.565 2.5-.942 2.533-2.54 2.533z"/></svg>
                  {/* <button onClick={() => handleDeleteClick(mcsp_name)}><svg className="trashcan" onClick={handleDeleteClick(mcsp_name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-4.992 0-10 1.242-10 3.144 0 .406 3.556 18.488 3.633 18.887 1.135 1.313 3.735 1.969 6.334 1.969 2.601 0 5.199-.656 6.335-1.969.081-.404 3.698-18.468 3.698-18.882 0-2.473-7.338-3.149-10-3.149zm0 1.86c4.211 0 7.625.746 7.625 1.667 0 .92-3.414 1.667-7.625 1.667s-7.625-.746-7.625-1.667 3.414-1.667 7.625-1.667zm4.469 19.139c-.777.532-2.418 1.001-4.502 1.001-2.081 0-3.721-.467-4.498-.998l-.004-.021c-1.552-7.913-2.414-12.369-2.894-14.882 3.55 1.456 11.304 1.455 14.849-.002-.868 4.471-2.434 12.322-2.951 14.902zm-7.872-7.418l-.492-.323 1.824-.008.78 1.667-.506-.32c-.723 1.146-1.027 1.764-.796 2.481-1.823-1.798-1.622-2.182-.81-3.497zm.622-1.304l.781-1.418c.195-.38 1.251-.075 1.688.899l-.797 1.445-1.672-.926zm2.673 5.175h-1.729c-.427.013-.672-1.061-.031-1.915h1.761v1.915zm.058-4.886l.524-.289c-.652-1.188-1.044-1.753-1.781-1.898 2.451-.729 2.593-.41 3.445.981l.521-.275-.79 1.654-1.919-.173zm3.059.005l.911 1.474c.236.355-.546 1.129-1.607 1.035l-.928-1.501 1.624-1.008zm-1.549 4.846l-.004.583-1.028-1.616 1.054-1.47-.006.6c1.354.011 2.037-.055 2.524-.63-.565 2.5-.942 2.533-2.54 2.533z"/></svg></button> */}
                  <span>{selected === i ? '-' : '+'}</span>
                </div>
                <div className={selected === i ? 'content show' : 'content'}>
                  <div className='item_wrapper'>
                    {userNames.map((user, j) => (
                      <div className='item_card' key={j}>
                          <p className='user_name'>{user.name}</p>
                          <p className='user_progress'> Task Completion:</p>
                          <div className='progressbar'>
                            <CircularProgressbar
                              value={Math.ceil((user.task_complete)/(user.total)*100)}
                              text={`${Math.ceil((user.task_complete)/(user.total)*100)}%`}
                              styles={buildStyles({
                                textSize: '10px',
                                textColor: '#00808C',
                                height:'100px',
                                width:'100px',
                                pathColor: '#00808C'
                              })}
                            />
                          </div>
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
