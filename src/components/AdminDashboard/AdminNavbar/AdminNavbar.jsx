import "./AdminNavbar.css";
import BTBlogo from "../../../assets/blue-ocean-logo-2.png";
import BtbContext from '../../../context/BtbContext'
import { useState, useContext } from "react";

const AdminNavbar = () => {
    const {setAdminModal, adminModal, user, logOut} = useContext(BtbContext)
    const [mouseover, setMouseover] = useState(false)

  const handleMouseover = () => {
    setMouseover(false);
  };

  return (
    <div className="admin-navbar-container" onMouseLeave={()=>setMouseover(false)}>
      <div className="admin-navbar-buttons">
          <img className="admin-navbar-logo" src={BTBlogo}></img>
          <div><span className={adminModal === "classes" ? "admin-focus" : "classes-btn"} onClick={()=>setAdminModal('classes')}>Classes</span></div>
          <div><span className={adminModal === "admins" ? "admin-focus" : "admins-btn"} onClick={()=>setAdminModal('admins')}>Admins</span></div>
          <div><span className={adminModal === "archives" ? "admin-focus" : "archives-btn"} onClick={()=>setAdminModal('archives')}>Archives</span></div>
      </div>
      <div className={`admin-dropdown ${mouseover ? 'mouseover' : ''}`}>
          <div className="admin-dropdown-btn" onMouseEnter={()=>setMouseover(true)}>
              <p className="admin-dropdown-avatar">{user.name.match(/\b\w/g).join("")}</p>
              <p>{user.name}</p>
                  <svg className={`triangle ${mouseover ? 'mouseover' : ''}`} viewBox="0 0 232.72 115">
                      <path className="cls-1" d="M116.02,120.76L1.17,.5H230.88L116.02,120.76Z"/>
                  </svg>
          </div>
          <div className={mouseover ? 'admin-dropdown-account' : 'hidden' }>
              <p onClick={()=>{setAdminModal('settings')}}>MY ACCOUNT</p>
              <p>{user.email}</p>
          </div>
          <div className={mouseover ? 'admin-dropdown-sign-out' : 'hidden'} onClick={logOut}>SIGN OUT</div>
      </div>
     </div>
  );
};

export default AdminNavbar;
