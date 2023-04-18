import NewClassForm from '../NewClassForm/NewClassForm'
import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Admins from './Admins/Admins'
import Settings from './Settings/Settings'

export const AdminDashboard = () => {
    return(
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <Admins />
                <Settings />
            </div>
        </div>
    )
}

export default AdminDashboard