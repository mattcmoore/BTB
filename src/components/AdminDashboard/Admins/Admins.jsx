import './Admins.css'
import Row from './Row'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Admins = () => {
    const {adminModal, admins, newAdmin, setNewAdmin, makeAdmin, options, getOptions} = useContext(BtbContext)

    const [tableData, setTableData] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [sortValue, setSortValue] = useState('name')
    const [isValid, setIsValid] = useState(true)
    const [defaultOption, setDefaultOption] = useState("")

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
        sorted()
    },[admins])

    useEffect(()=>{
        setIsAsc(true)
        setSortValue('name')
        getOptions()    
    },[])

    const headers = [
        {key: "delete", label:""},
        {key: "name", label: "name"},
        {key: "email", label: "email"},
        // {key: "mcsp", label: "mcsp"},

    ]

    const handleChange = (event) => {
        console.log(event.target)
        const {name, value} = event.target
        setNewAdmin(prev => {
            return {...prev, [name] : value }
        })
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13){
            if(event.target.parentElement.className === "input-row"){
            }
            if( Object.keys(newAdmin).every(key => newAdmin[key] !== "" && isValid === true) ){
                makeAdmin(newAdmin)
            }else {
                console.log('focus next')
            }
        }
    }

    if(adminModal==='admins'){
        return(
            <div className="admin-table">
                <h1>Current Admins</h1>
                <h3>(Add New Admin Or Click To Edit)</h3>
                <table>
                        <thead>
                            <tr>
                                {headers.map( row => {
                                    return <th key={row.key} name={row.id}>{row.label}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(row => {
                                return <Row key={row.id} row={row} />    
                            })}
                            <tr className="input-row" key={tableData.length+1}>
                                <td name="delete"></td>
                                <td><input autoFocus type="text" name="name"  value={newAdmin.name} onChange={handleChange} onKeyDown={handleEnter}/></td>
                                <td><input type="text" name="email" value={newAdmin.email} onChange={handleChange} onKeyDown={handleEnter}/></td>
                            </tr>               
                        </tbody>
                </table>
            </div>
        )
    } 
}

export default Admins