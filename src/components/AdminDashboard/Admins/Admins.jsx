import './Admins.css'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect} from 'react'


const Admins = () => {
    const {adminModal, admins, newAdmin, setNewAdmin} = useContext(BtbContext)
    const [tableData, setTableData] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [sortValue, setSortValue] = useState('')
    const [isValid, setIsValid] = useState(true)


    const [test, setTest] = useState('')

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
        setIsAsc(true)
        setSortValue('name')
        sorted()
    })
    const headers = [
        {key: "name", label: "name"},
        {key: "email", label: "email"},
        {key: "password", label: "password"},
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
            if( Object.keys(newAdmin).every(key => newAdmin[key] !== "" && isValid === true) ){
                console.log('submit')
            }else {
                console.log('focus next')
            }
        }
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
                                return <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.password}</td>
                                </tr>
                            })}
                            <tr key={tableData.length+1}>
                                <td><input type="text" name="name" value={newAdmin['name']} onChange={handleChange} onKeyDown={handleEnter}/></td>
                                <td><input type="text" name="email" value={newAdmin.email} onChange={handleChange} onKeyDown={handleEnter}/></td>
                                <td><input type="text" name="password" value={newAdmin.password} onChange={handleChange} onKeyDown={handleEnter}/></td>
                            </tr>
                          
                        </tbody>
                </table>
            </div>
        )
    } 
}

export default Admins