import React, {useContext} from 'react'
import LoginForm from "../LoginForm/LoginForm";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import BtbContext from '../../context/BtbContext.jsx'

function ProtectedHome() {
    const {user} = useContext(BtbContext)
    if(user){
        if(user.admin){
            return(
                <AdminDashboard/>
            )
        } else {
            return(
                <StudentDashboard/>
            )
        }
    } else{
        return (
        <LoginForm/>
      )

    }
}

export default ProtectedHome