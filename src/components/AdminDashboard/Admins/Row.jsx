import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'

const Row = (props) => {
    const {index, handleChange, handleEnter} = props
    const [currentCell, setCurrentCell] = useState([])

    // const []= useContext(BtbContext)

    const handleClick = (event) => {
        setCurrentCell()
        setAdminUpdate(updateObj)
        setCurrentCell([name, id.toString()])
        // console.log(currentCell)
        // setAdminUpdate(prev => {
        //     return {...prev, [name] : value }
        // })
        // const {name, value} = event.target
        // console.log(event.target.parentElement.rowIndex)
    }


    return(
        <tr name={index} key={index}>
            <td name="name" onClick={handleClick}><input name={"name"} index={row.id.toString()} value={adminUpdate.name} onChange={handleChange} onKeyDown={handleEnter} alt={row.name} /></td>
            <td name="email" onClick={handleClick}>{row.email}</td>
        </tr>
    ) 
}

export default Row