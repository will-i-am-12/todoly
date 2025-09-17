import { useState } from "react"
import {Link, Outlet} from 'react-router-dom'
import './Layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import Login from '../components/Login.jsx'
import Signup from "../components/Signup.jsx"
import { UserAuth } from '../context/AuthContext';
import CheckEmail from "../components/CheckEmail.jsx"
const Layout = () =>{
    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);
    const { session } = UserAuth();
    const [emailSent, setEmailSent] = useState(false);
    

    return(
        <div className="app-layout">
            <nav className="nav-bar">
                <h1 className="logo">TODOLY</h1>
                <div className="buttons">
                    {session ? (
                        <div className="nav-icons">
                            <Link to='/tasks'><FontAwesomeIcon icon={faHome} /></Link>
                            <Link to ='/create'><FontAwesomeIcon icon={faCirclePlus} /></Link>
                            <Link to = '/'><FontAwesomeIcon icon={faUser} /></Link>
                        </div>
                    )
                    :(
                    <>
                        <button onClick={()=>setOpenLogin(true)} className="login">Log in</button>
                        <button onClick={()=>setOpenSignup(true)} className="signup">Sign up</button>
                    </>)
                    }
                </div>
            </nav>
            <div className="content">
                <Outlet/>
            </div>
            {openLogin && <Login onClose={()=>setOpenLogin(false)} createAccount={()=>setOpenSignup(true)} />}
            {openSignup && <Signup onClose={()=>setOpenSignup(false)} LoginAccount={()=>setOpenLogin(true)} checkEmail={()=>setEmailSent(true)}/>}
            {emailSent && <CheckEmail onClose={()=>setEmailSent(false)}/>}
        </div>

    )

}
export default Layout