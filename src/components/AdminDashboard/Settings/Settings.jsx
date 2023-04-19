import BtbContext from "../../../context/BtbContext"
import "./Settings.css"
import {useContext} from 'react'

const Settings = () => {
    const {adminModal, setAdminModal, user} = useContext(BtbContext)
    if(adminModal === 'settings'){
        return(
            <div className="settings-container">
                <h1>Account Settings</h1>
                <form>
                    <div>
                        <label>* Name</label>
                        <input className="btb-input" value={user.name}></input>
                    </div>
                    <div>
                        <label>* Phone</label>
                        <input className="btb-input" value={user.name}></input>
                    </div>
                    <div>
                        <label>* MCSP</label>
                        <input className="btb-input" value={user.name}></input>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default Settings