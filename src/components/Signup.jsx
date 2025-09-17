import {  useState,useEffect } from 'react'
import './Signup.css'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = ({onClose,LoginAccount,checkEmail}) =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const {session,signUpNewUser} = UserAuth();
    const handleSignup = async(e) =>{
        e.preventDefault()
        setLoading(true)
        setError("");

        if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
    }
        try{    
            const result = await signUpNewUser(email,password);
            if(result.success){
                onClose()
                checkEmail()
            }
        }catch(err){
            setError("an error occured");
        }
        finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'; 
    
        return () => {
          document.body.style.overflow = 'auto'; 
        };
      }, []);
    const handleOverlayClick = (e) => {
    if (e.target.className === 'signup-modal') {
      onClose();
    }}

    const handleLogin = ()=>{
        e.preventDefault();
        onClose();
        LoginAccount();

    }
    return(
        <div className='signup-modal' onClick={handleOverlayClick}>
            <div className='signup-content'>
                <h1>CREATE ACCOUNT</h1>
                <form onSubmit={handleSignup}>
                    <input 
                    id='username'
                    placeholder='Enter Email'
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoFocus/>

                    <input
                    id='password'
                    placeholder = 'Enter Password'
                    type='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
                    />

                    <input
                    id = 'confirm-password'
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                    className={error === "Passwords do not match" ? "input-error" : ""}
                    required
                    />
                    <div className='exist-account'>
                        <div><h4>Already have an account? </h4></div>
                        <div className = 'log-in'onClick={handleLogin}>Log in</div>
                    </div>
                    <button className = 'signup-button'type="submit">signup</button>
                    {error && <p className="error-message">{error}</p>}

                </form>

            </div>

        </div>
    )
}
export default Signup