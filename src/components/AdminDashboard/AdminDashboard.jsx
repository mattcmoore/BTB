import NewClassForm from '../NewClassForm/NewClassForm'
import './AdminDashboard.css'
import AdminNavbar from './AdminNavbar/AdminNavbar'
import Admins from './Admins/Admins'
import AdminStudentInterface from './AdminStudentInterface/AdminStudentInterface'
import Settings from './Settings/Settings'
import Chatbar from '../ChatBar/Chatbar'
import Classes from './Classes/Classes'
import Archives from './Archives/Archive'

export const AdminDashboard = () => {
    return(
        <>
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="admin-dashboard-container-body"> 
                <Admins />
                <Settings />
                <Classes />
                <NewClassForm />
                <Archives />
            </div>
        </div>
        <Chatbar/>
        </>
    )
}

export default AdminDashboard