import './ResetPasswords.css'
import { useState,useEffect } from 'react'
import {supabase} from '/client.js'

const ResetPasswords = ({onClose,LoginAccount}) =>{

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
            document.body.style.overflow = 'hidden'; 
        
            return () => {
              document.body.style.overflow = 'auto'; 
            };
          }, []);
        const handleOverlayClick = (e) => {
        if (e.target.className === 'reset-password-modal') {
          onClose();
        }}
    const handleForgetPassword =async(e)=>{
        e.preventDefault();

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://wtodoly.netlify.app/update-password',
        });

        if (error) {
            console.error('Reset error:', error);
            setStatus({ success: false, message: error.message });
        } else {
            setStatus({ success: true, message: 'Password reset email sent!' });
        }
    }
    const handleLogin =()=>{
        onClose();
        LoginAccount();
    }
    return(

        <div className='reset-password-modal'  onClick={handleOverlayClick}>
            <div className='reset-password-content'>
                <h1>Reset Password</h1>
                <p>Enter the email address you signed up with, and we’ll send you a reset link.</p>
                <form onSubmit={handleForgetPassword}>
                    <input
                    id = 'reset-email'
                    placeholder='Email address'
                    type = 'text'
                    value ={email}
                    onChange ={e=>setEmail(e.target.value)}
                    required 
                    autoFocus
                    />
                    {status && (
                <p className={status.success ? 'success' : 'error'}>{status.message}</p>
                 )}
                    <button className='reset-password-button'>Reset Password</button>
                </form>
                <div className = 'back-to-login'onClick={handleLogin}>Back to Login</div>
                
            </div>
        </div>
    )
}
export default ResetPasswords