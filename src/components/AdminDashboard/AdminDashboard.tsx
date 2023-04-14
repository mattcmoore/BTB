import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Chatbar from '../ChatBar/Chatbar'

const AdminDashboard = () => {
    return(
        <>
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body">
                
            </div>
        </div>
        <Chatbar/>
        </>
    )
}

export default AdminDashboard