import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import {useState} from 'react'

const AdminDashboard = () => {
    
    return(
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <AdminModal />
            </div>
        </div>
    )
}

export default AdminDashboard