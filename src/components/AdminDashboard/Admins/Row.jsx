import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'

const Row = (props) => {
    const {row} = props
    const [currentCell, setCurrentCell] = useState([])

    const {adminUpdate, setAdminUpdate}= useContext(BtbContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setAdminUpdate(prev => {
            return {...prev, [name] : value }
        })
    }

    const handleClick = (event) => {
        setCurrentCell([event.target.parentElement.getAttribute("name"), event.target.getAttribute("name")])
    }

    const handleEnter = () => {
        
    }

    return(
        <tr name={row.id} key={row.id}>
            <td name="name" onClick={handleClick}> {currentCell[1] === "name" ? (<input name="name" value={adminUpdate.name} onChange={handleChange} onKeyDown={handleEnter} />) : (row.name) }</td>
            <td name="email" onClick={handleClick}>{currentCell[1] === "email" ? (<input name="email" value={adminUpdate.email} onChange={handleChange} onKeyDown={handleEnter} />) : (row.email) }</td>
        </tr>
    ) 
    
}


export default Row