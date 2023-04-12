import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'

const Row = (props) => {
    const {row} = props
    const [currentCell, setCurrentCell] = useState([])

    const {admins, adminUpdate, setAdminUpdate, updateAdmin}= useContext(BtbContext)

    const handleClick = (event) => {
        const id = parseInt(event.target.parentElement.getAttribute("name"))
        const name = event.target.getAttribute("name")
        if(Object.keys(adminUpdate).length === 0){
            setCurrentCell([id, name])
            setAdminUpdate(row)    
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setAdminUpdate(prev => {
            return {...prev, [name] : value} 
        })
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13){
            updateAdmin(adminUpdate)
            setCurrentCell([])
        }
    }

    return(
        <tr name={row.id} key={row.id}>
            <td name="name" onClick={handleClick}> {currentCell[0] === row.id && currentCell[1] === "name" ? (<input name="name" value={adminUpdate.name} onChange={handleChange} onKeyDown={handleEnter} />) : (row.name) }</td>
            <td name="email" onClick={handleClick}> {currentCell[1] === "email" ? (<input name="email" value={adminUpdate.email} onChange={handleChange} onKeyDown={handleEnter} />) : (row.email) }</td>
        </tr>
    ) 
    
}


export default Row