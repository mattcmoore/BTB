// import BtbContext from '../../../context/BtbContext'
// import './classes.css'

// function Classes(){
//     return (
//         <div className='wrapper'>
//             <div className='accordian'>
//                 {data.map((item, i) => (
//                     <div className='item'>
//                        import { useContext, useState, useEffect } from 'react';


// const Classes = () => {
//     const { adminModal, setAdminModal } = useContext(BtbContext);
//     const [selected, setSelected] = useState(null);
//     const [classes, setClasses] = useState([]);

//     useEffect(() =>{
//         const fetchClasses = async () => {
//                 const response = await fetch(`http://localhost:3000/accordian`); // Pass mcspsId as part of the URL
//                 const data = await response.json();

//                 const groupedData = data.reduce((acc, item) => {
//                     const existingItem = acc.find(i => i.mcsp_name === item.mcsp_name);
//                     if (existingItem) {
//                       existingItem.user_names.push(item.user_name);
//                     } else {
//                       acc.push({
//                         mcsp_name: item.mcsp_name,
//                         user_names: [item.user_name],
//                       });
//                     }
//                     return acc;
//                   }, []);

//         }
//       console.log(groupedData);
//     })

    // useEffect(() => {
    //     // Fetch data from server and update state
    //     const fetchClasses = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/accordian`); // Pass mcspsId as part of the URL
    //             const data = await response.json();

    //             // Filter out duplicate mcsp_name values
    //             const uniqueClasses = [];
    //             const mcspMap = new Map();

    //             data.forEach(item => {
    //                 const mcspName = item.mcsp_name;
    //                 const userName = item.user_name;

    //                 if (!mcspMap.has(mcspName)) {
    //                     mcspMap.set(mcspName, new Set());
    //                 }

    //                 mcspMap.get(mcspName).add(userName);
    //             });

    //             mcspMap.forEach(userNamesSet => {
    //                 const userNamesArray = Array.from(userNamesSet);
    //                 uniqueClasses.push({
    //                     mcsp_name: userNamesArray[0],
    //                     user_names: userNamesArray,
    //                 });
    //             });
    //             console.log(uniqueClasses);

    //             setClasses(uniqueClasses);
    //         } catch (err) {
    //             console.error('Error fetching users:', err);
    //         }
    //     };
    //     fetchClasses();
    // }, []); // Include mcspsId as a dependency to fetch users whenever it changes

//     const toggle = (i) => {
//         if (selected === i) {
//             return setSelected(null);
//         }
//         setSelected(i);
//     };

//     const handleAddClick = () => {
//         setAdminModal('newclass');
//     };

//     if (adminModal === 'classes') {
//         return (
//             <div className='wrapper'>
//                 <button className='add' onClick={handleAddClick}> Add New Class </button>
//                 <div className='accordian'>
//                     {classes.map((item, i) => {
//                         const percentage = (item.task_complete / item.total) * 100;
//                         const userNames = item.user_names;
//                         const mcsp_name = item.mcsp_name;

//                         return (
//                             <div className='item' key={i}>
//                                 <div className='title' onClick={() => toggle(i)}>
//                                     <h2>{item.mcsp_name}</h2>
//                                     <span>{selected === i ? '-' : '+'}</span>
//                                 </div>
//                                 <div className={selected === i ? 'content show' : 'content'}>
//                                     <div>
//                                         <ul>
//                                             {userNames.map((userName, j) => (
//                                                 <li key={j}>{userName}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                     <div style={{ width: 100, height: 100 }}>
//                                         <CircularProgressbar
//                                             value={percentage}
//                                             text={`${percentage}%`}
//                                             styles={buildStyles({
//                                                 textSize: '16px',
//                                             })}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         );
//     }
// };

//  <div className='title'>
// //                             <h2>{item.question}</h2>
// //                             <span>+</span>
// //                         </div>
//                         <div className='content'>{item.answer}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// const data = [
//     {
//         question: 'smafkmfs',
//         answer:'ldsmflsdfmsdmflmsdfmlsfdm'
//     }
// ]

// export default Classes