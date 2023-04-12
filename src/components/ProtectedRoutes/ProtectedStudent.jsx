import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import BtbContext from '../../context/BtbContext'

function ProtectedStudent({children}) {
    const {user} = useContext(BtbContext)
    if(user){
        if(!user.admin){
            return children
        } else {
            return <Navigate to='/' replace />
        }
    } else {
        return <Navigate to='/' replace />
    }
}

export default ProtectedStudent