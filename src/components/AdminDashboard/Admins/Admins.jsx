import './Admins.css'
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
        {key: "password", label: "password"},
    ]

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewAdmin({...newAdmin, [name] : value}) 
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