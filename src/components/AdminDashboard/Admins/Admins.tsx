import './Admins.css'
import BtbContext from "../../../context/BtbContext"
import React, {useState, useContext, FC} from 'react'

const Admins: React.FC = () => {
    const {adminModal} = useContext(BtbContext)

    if(adminModal==='admins'){
        return(
            <div className="admin-table"></div>
        )
    }
    
}

export default Admins