import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'
import Select from 'react-select';

const Row = (props) => {
    const {row, values} = props
    const [currentCell, setCurrentCell] = useState([])
    const [hoveredOption, setHoveredOption] = useState(null)
    const [hoveredValue, setHoveredValue] = useState(null)
    const [dropdown, setDropdown] = useState(true)

    const {admins, adminUpdate, setAdminUpdate, updateAdmin, deleteAdmin, options}= useContext(BtbContext)

    const handleClick = (event) => {
        const id = parseInt(event.target.parentElement.getAttribute("name"))
        const name = event.target.getAttribute("name")
        if(event.target.parentElement.getAttribute("name") === "delete" ){
            let userId = parseInt(event.target.parentElement.parentElement.getAttribute("name"))
            deleteAdmin(userId)
        }else if(Object.keys(adminUpdate).length === 0){
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

    const handleSelectChange = (option) => {
        const {value, label} = option
        setHoveredOption(value)
        setHoveredValue(label)
        setAdminUpdate(prev => {
            return {...prev, mcsp : value} 
        })
        setDropdown(false)
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13){
            updateAdmin(adminUpdate)
            setCurrentCell([])
            setSelected(false)
        }
    }

    return(
        <tr className="input-row" name={row.id} key={row.id}>
            <td name="delete">
                <svg className="trashcan" onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                </svg>
            </td>
            <td name="name" onClick={handleClick}> {currentCell[0] === row.id && currentCell[1] === "name" ? (<input name="name" value={adminUpdate.name} onChange={handleChange} onKeyDown={handleEnter} />) : (row.name) }</td>
            <td name="email" className="email-cell">{row.email }</td>
            {/* <td name="mcsp" onClick={handleClick}> {currentCell[0] === row.id && currentCell[1] === "mcsp" ? dropdown ?  <Select className="mcsp-dropdown" onChange={handleSelectChange} value={options[0]} options={options} />  : <input value={hoveredValue} onKeyDown={handleEnter} ></input> : row.mcsp === null ? "*" : row.mcsp }</td> */}
        </tr>
    ) 
    
}


export default Row