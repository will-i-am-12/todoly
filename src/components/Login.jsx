import { useState,useEffect } from 'react';
import './Login.css'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = ({onClose,createAccount,resetPassword})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const {session,signInUser} = UserAuth();
    const navigate = useNavigate()
    const handleSignIn = async(e) =>{
        e.preventDefault()
        setLoading(true)
        
        try{    
            const result = await signInUser(email,password);
            if(result.success){
                onClose()
                navigate('/tasks')
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
    if (e.target.className === 'login-modal') {
      onClose();
    }
  };
  const handleSignup = ()=>{
        onClose();
        createAccount();

    }
    const handleForgetPassword = ()=>{
        onClose();
        resetPassword();
    }
    return(
            <>
            <div className="login-modal" onClick={handleOverlayClick}>  
                <div className="login-content">
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSignIn}>
                        <div>
                            <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter Username/Email'
                            required
                            autoFocus
                            />
                        </div>

                        <div>
                            <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)
                            }
                            placeholder='Enter Password'
                            required
                            />
                        </div>
                        <div className='login-issue'>
                            <div className = 'forget' onClick={handleForgetPassword}>Forgot Password?</div>
                            <div className = 'sign-up'onClick={handleSignup}>Sign up</div>
                        </div>

                        <button className = 'login-button'type="submit">login</button>
                        {error && <p className="error-message">{error}</p>}

                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;