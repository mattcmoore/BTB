import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'

const Row = (props) => {
    // const arr = [props.name, props.index]
    const {index, handleClick, currentCell, adminUpdate }
    <tr name={index} key={index}>
        <td name="name" onClick={handleClick}><input currentCell={currentCell} name={"name"} value={adminUpdate.name} onChange={handleChange} alt={row.name} /></td>
        <td name="email" onClick={handleClick}>{row.email}</td>
    </tr>
}

export default Row