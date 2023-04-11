import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import BtbContext from '../../context/BtbContext'

function ProtectedUser({children}) {
    const {user} = useContext(BtbContext)
    if(user){
        return children
    } else {
        return <Navigate to='/' replace />
    }
}

export default ProtectedUser