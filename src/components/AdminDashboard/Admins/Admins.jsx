import './Admins.css'
import Row from './Row'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, FC} from 'react'


const Admins = () => {
    const {adminModal, admins} = useContext(BtbContext)
    const [tableData, setTableData] = useState(admins)
    const [isAsc, setIsAsc] = useState(true)
    const [newAdmin, setNewAdmin] = useState({
        "name":"",
        "email":"",
        "password":"",
    })

    cont [currentCell, setCurrentCell] = useState([])

    const sorted = async (val, order = isAsc) => {
            const data = await admins
            setIsAsc(order)
            const sorted= data.sort((a, b) => {
                if (a[val] < b[val]) return isAsc ? -1 : 1;
                if (a[val] > b[val]) return isAsc ? 1 : -1;
                return 0;
              });
            setTableData(sorted)
    }   

    sorted('name')

    const headers = [
        {key: "name", label: "name"},
        {key: "email", label: "email"},
    ]

    const handleChange = (event) => {

        const {name, value} = event.target
        setNewAdmin({...newAdmin, [name] : value}) 
    }

    const handleClick = (event) => {
        const name = event.target.getAttribute("name")
        const id = event.target.parentElement.getAttribute("name")
        const updateObj = {}
        updateObj["id"] = id
        Array.prototype.slice.call(event.target.parentElement.children).forEach(cell => {
            updateObj[cell.getAttribute('name')] = cell.innerText 
        })
        setAdminUpdate(updateObj)
        setCurrentCell([name, id.toString()])
        // console.log(currentCell)
        // setAdminUpdate(prev => {
        //     return {...prev, [name] : value }
        // })
        // const {name, value} = event.target

        // console.log(event.target.parentElement.rowIndex)

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
                                return <Row index={row.id} handleClick={handleClick} handleChange={handleChange} handleClick={handleClick} alt={row.name}  />
                            })}
                            <tr key={tableData.length+1}>
                                <td><input type="text" name="name" value={newAdmin.name} onChange={handleChange}/></td>
                                <td><input type="text" name="email" value={newAdmin.email} onChange={handleChange}/></td>
                                <td><input type="text" name="password" value={newAdmin.password} onChange={handleChange}/></td>
                            </tr>
                          
                        </tbody>
                </table>
            </div>
        )
    } 
}



export default Admins