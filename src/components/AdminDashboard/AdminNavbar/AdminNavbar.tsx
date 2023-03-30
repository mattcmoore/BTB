import './AdminNavbar.css'
import BTBlogo from '../../../assets/blue-ocean-logo-2.png'
import {useState, useEffect} from 'react'

const AdminNavbar = () => {
    const [mouseover, setMouseover] = useState(false)

    const handleMouseover = () => {
        setMouseover(false)
    }

    return( 
        <div className="admin-navbar-container" onMouseLeave={()=>setMouseover(false)}>
            <div className="admin-navbar-buttons">
                <img className="admin-navbar-logo" src={BTBlogo}></img>
                <div><span className="classes-btn">Classes</span></div>
                <div><span className="admins-btn">Admins</span></div>
                <div><span className="archives-btn">Archives</span></div>
            </div>
            <div className={`admin-dropdown ${mouseover ? 'mouseover' : ''}`}>
                <div className="admin-dropdown-btn" onMouseEnter={()=>setMouseover(true)}>
                    <p className="admin-dropdown-avatar">AA</p>
                    <p>ADMIN-NAME</p>
                        <svg id="triangle" viewBox="0 0 232.72 86.82">
                            <defs>
                                <style>
                                    .cls-1 {
                                        fill: #231f20;
                                        stroke: #fff;
                                        stroke-miterlimit: 10;
                                    }
                                </style>
                            </defs>
                        <path class="cls-1" d="M116.36,86.19L1.51,.5H231.21L116.36,86.19Z"/>
                        </svg>
                </div>
                <div className={mouseover ? 'admin-dropdown-account' : 'hidden' }>
                    <p>MY ACCOUNT</p>
                    <p>email address</p>
                </div>
                <div className={mouseover ? 'admin-dropdown-sign-out' : 'hidden'}>SIGN OUT</div>
             </div>
        </div>
    )
}

export default AdminNavbar