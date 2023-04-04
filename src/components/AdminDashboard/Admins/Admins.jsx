import './Admins.css'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, FC} from 'react'


const Admins = () => {
    const {adminModal, admins} = useContext(BtbContext)
    
    const [tableData, setTableData] = useState(admins)
    const [isDesc, setIsDesc] = useState(false)

    const sortData = async (val, order) => {
            const data = await admins
            console.log(data)
            const sorted= data.sort((a, b) => {
                if (a.name < b.name) return isDesc ? 1 : -1;
                if (a.name > b.name) return isDesc ? -1 : 1;
                return 0;
              });
            setTableData(sorted)
            setOrder(!isDesc)
    }   
    sortData('name')

    const headers = [
        {key: "name", label: "name"},
        {key: "email", label: "email"},
        {key: "password", label: "password"},
    ]

    if(adminModal==='admins'){
        return(
            <div className="admin-table">
                <table>
                        <thead>
                            <tr>
                                {headers.map( (row) => {
                                    return <th key={row.key}>{row.label}</th>
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
                        </tbody>
                </table>
            </div>
        )
    } 
}

export default Admins