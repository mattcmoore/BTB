import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, useEffect, useRef} from 'react'

const Cell = (props) => {
    const arr = [props.name, props.index]
    console.log(props.currentCell === arr)
    return props.currentCell === [props.name, props.index] ? 
        <input autoFocus type="text" name={props.name} value={props.value} onChange={props.onChange} onKeyDown={props.onKeyDown}/> :
        props.id

    // if (props.currentCell === [props.name, props.id] ){
    //     console.log([props.name, props.id])
    //     return <input autoFocus type="text" name={props.name} value={props.value} onChange={props.onChange} onKeyDown={props.onKeyDown}/>
    // } else{
    //     return rows[props.name]
    // }
}

export default Cell