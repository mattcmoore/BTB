import './Admins.css'
import Row from './Row'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'


const Admins = () => {
    const {adminModal, admins, newAdmin, setNewAdmin, makeAdmin, adminUpdate, setAdminUpdate} = useContext(BtbContext)

    const [tableData, setTableData] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [sortValue, setSortValue] = useState('name')
    const [isValid, setIsValid] = useState(true)

    const nameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const sorted = async () => {
            const val = sortValue
            const data = await admins
            const sorted = data.sort((a, b) => {
                if (a[val] < b[val]) return isAsc ? -1 : 1;
                if (a[val] > b[val]) return isAsc ? 1 : -1;
                return 0;
              });
            setTableData(sorted)
    }
    
    useEffect(()=>{
        // setIsAsc(true)
        // setSortValue('name')
        sorted()
    })

    useEffect(()=>{
        setIsAsc(true)
        setSortValue('name')
    },[])



    const headers = [
        {key: "name", label: "name"},
        {key: "email", label: "email"},
    ]

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewAdmin(prev => {
            return {...prev, [name] : value }
        })
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13){
            console.log('enter')
            if(event.target.parentElement.className === "input-row"){
                console.log("update")
            }
            if( Object.keys(newAdmin).every(key => newAdmin[key] !== "" && isValid === true) ){
                makeAdmin(newAdmin)
            }else {
                console.log('focus next')
            }
        }
    }

    
    
    const handleUpdate = (event) => {

    }

    if(adminModal==='admins'){
        return(
            <div className="admin-table">
                <table>
                        <caption>
                           (Add New Admin Or Click To Edit)
                        </caption>
                        <thead>
                            <tr>
                                {headers.map( row => {
                                    return <th key={row.key} name={row.id}>{row.label}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(row => {
                                <Row index={row.id.toString} handleChange={handleChange} handleEnter={handleEnter}/>
                              
                            })}
                            {/* <tr className="input-row" key={tableData.length+1}>
                                <td><input autoFocus type="text" name="name" ref={nameInputRef} value={newAdmin.name} onChange={handleChange} onKeyDown={handleEnter}/></td>
                                <td><input type="text" name="email" ref={emailInputRef} value={newAdmin.email} onChange={handleChange} onKeyDown={handleEnter}/></td>
                            </tr> */}
                          
                        </tbody>
                </table>
            </div>
        )
    } 
}



export default Admins