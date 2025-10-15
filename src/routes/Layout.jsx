import { useState,useEffect } from "react"
import {Link, Outlet} from 'react-router-dom'
import './Layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import Login from '../components/Login.jsx'
import Signup from "../components/Signup.jsx"
import { UserAuth } from '../context/AuthContext';
import CheckEmail from "../components/CheckEmail.jsx";
import ResetPasswords from "../components/ResetPasswords.jsx";
import { useNavigate } from 'react-router-dom'


const Layout = () =>{

    const [openLogin,setOpenLogin] = useState(false);
    const [openSignup,setOpenSignup] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [forgetPassword,setForgetPassword] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const {session,signOut} = UserAuth()
    const navigate = useNavigate();
    const handleSignOut = async(e) =>{
        e.preventDefault();
        try{
            await signOut();
            navigate('/');
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        if (session) {
            setForgetPassword(false);
            setEmailSent(false);
            setOpenSignup(false);
            setOpenLogin(false);
        }
    }, [session]);
    return(
        <div className="app-layout">
            <nav className="nav-bar">
                <h1 className="logo">TODOLY</h1>
                <div className="buttons">
                    {session ? (
                        <>
                        <div className="nav-icons">
                            <Link to='/tasks'><FontAwesomeIcon icon={faHome} /></Link>
                            <Link to ='/create'><FontAwesomeIcon icon={faCirclePlus} /></Link>
                            <div onClick={()=>setOpenProfile(prev=>!prev)}><FontAwesomeIcon icon={faUser} /></div>
                        </div>
                        </>
                        )
                        :(
                        <>
                            <button onClick={()=>setOpenLogin(true)} className="login">Log in</button>
                            <button onClick={()=>setOpenSignup(true)} className="signup">Sign up</button>
                        </>)
                    }
                </div>
            </nav>
            {
                openProfile &&(
                <div className="profile-dropdown">
                    <div className='signout' onClick={handleSignOut}><h1>Sign out</h1></div>
                </div>
                    )
            }
            <div className="content">
                <Outlet/>
            </div>
            {openLogin && <Login onClose={()=>setOpenLogin(false)} createAccount={()=>setOpenSignup(true)} resetPassword={()=>setForgetPassword(true)}/>}
            {openSignup && <Signup onClose={()=>setOpenSignup(false)} LoginAccount={()=>setOpenLogin(true)} checkEmail={()=>setEmailSent(true)}/>}
            {emailSent && <CheckEmail onClose={()=>setEmailSent(false)}/>}
            {forgetPassword && <ResetPasswords onClose={()=>setForgetPassword(false) } LoginAccount={()=>setOpenLogin(true)}/>}
        </div>

    )

}
export default Layout