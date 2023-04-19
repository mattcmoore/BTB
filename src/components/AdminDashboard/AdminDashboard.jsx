import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Admins from './Admins/Admins'
import AdminStudentInterface from './AdminStudentInterface/AdminStudentInterface'

export const AdminDashboard = () => {
    return(
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <Admins />
            </div>
            <div className="admin-student-interface">
                <AdminStudentInterface/>
            </div>
        </div>
    )
}

export default AdminDashboard