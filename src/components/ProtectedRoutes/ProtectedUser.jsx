import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import BtbContext from '../../context/BtbContext'

function ProtectedUser({children}) {
    const {user} = useContext(BtbContext)
    if(user){
        return <Navigate to='/' replace />
    } else {
        return children
    }
}

export default ProtectedUser