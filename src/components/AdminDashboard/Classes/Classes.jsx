import { useContext, useState, useEffect } from 'react';
import BtbContext from '../../../context/BtbContext';
import './Classes.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Flickity from 'react-flickity-component'
import './flickity.css'


const flickityOptions = {
    initialIndex: 2
}
const Classes = () => {
    const { adminModal, setAdminModal } = useContext(BtbContext);
    const [selected, setSelected] = useState(null);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Fetch data from server and update state
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://localhost:3000/accordian`); // Pass mcspsId as part of the URL
                const data = await response.json();

                // Group data by mcsp_name
                const groupedData = data.reduce((acc, item) => {
                  const existingItem = acc.find(i => i.mcsp_name === item.mcsp_name);
                  if (existingItem) {
                    existingItem.user_names.push({
                      name: item.user_name,
                      task_complete: item.task_complete,
                      total: item.total,
                    });
                  } else {
                    acc.push({
                      mcsp_name: item.mcsp_name,
                      user_names: [{
                        name: item.user_name,
                        task_complete: item.task_complete,
                        total: item.total,
                      }],
                    });
                  }
                  return acc;
                }, []);

                console.log(groupedData);

                setClasses(groupedData);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchClasses();
    }, []); // Include mcspsId as a dependency to fetch users whenever it changes

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
                <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      <img src="https://placeimg.com/640/480/animals" />
      <img src="https://placeimg.com/640/480/nature" />
      <img src="https://placeimg.com/640/480/architecture" />
    </Flickity>
                <button className='add' onClick={handleAddClick}> Add New Class </button>
                <div className='accordian'>
                    {classes.map((item, i) => {
                        const percentage = (item.task_complete / item.total) * 100;
                        // const percentage = (item.user_names.reduce((acc, user) => acc + user.task_complete, 0) / item.user_names.reduce((acc, user) => acc + user.total, 0)) * 100;
                        const userNames = item.user_names;
                        const mcsp_name = item.mcsp_name;

                        return (
                            
                            <div className='item' key={i}>
                                <div className='title' onClick={() => toggle(i)}>
                                    <h2>{item.mcsp_name}</h2>
                                    <span>{selected === i ? '-' : '+'}</span>
                                </div>
                                <div className={selected === i ? 'content show' : 'content'}>
                                    <div>
                                        <ul>
                                            {userNames.map((user, j) => (
                                                <span key={j}>
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
                                            ))}
                                        </ul>
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

