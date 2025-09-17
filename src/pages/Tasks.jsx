import './Tasks.css' 
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Tasks = () =>{
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
    return(
        <div>
            <div>
                <span className='circle-bottom'></span>
            </div>
            <div className='signout' onClick={handleSignOut}><h1>Sign out</h1></div>
        </div>
    )
}
export default Tasks