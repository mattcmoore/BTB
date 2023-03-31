import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Admins from './Admins/Admins'

const AdminDashboard = () => {
    return(
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <Admins />
            </div>
        </div>
    )
}

export default AdminDashboard