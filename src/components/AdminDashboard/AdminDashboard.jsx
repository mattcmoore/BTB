import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Admins from './Admins/Admins'
import Chatbar from '../ChatBar/Chatbar'

export const AdminDashboard = () => {
    return(
        <>
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <Admins />
            </div>
        </div>
        <Chatbar/>
        </>
    )
}

export default AdminDashboard