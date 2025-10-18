import './Tasks.css' 
import { UserAuth } from '../context/AuthContext'
import { useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { supabase } from "/client.js"

const Tasks = () =>{
    const { id } = useParams()
    const navigate = useNavigate()

    const{session} = UserAuth();
    const user = session?.user
    const[tasks,setTasks] =useState(null)
    const[loading,setLoading] = useState(true)
    const[error, setError] = useState(null)
    
    useEffect (()=>{
        if (!user) return;
        const fetchData = async ()=>{
            setError(null)

            try{
                const {data: taskData, error: taskError} = await supabase 
                .from("todo")
                .select()
                .eq("user_id", user.id)
                .order('id', { ascending: true })

                if(taskError) throw taskError
                setTasks(taskData)
            }
            catch(err){
                console.error("Error fetching data:", err)
                setError("Failed to load task data.")
            }
            finally{
                setLoading(false)
            }
        }
        fetchData()
    },[user])

    const handleDelete = async (taskId)=>{
        try{
            const{error} = await supabase.from("todo").delete().eq("id",taskId).eq("user_id", user.id);
            if (error) throw error
            navigate("/")
        }
        catch (err) {
        console.error("Error deleting task:", err)
        }
    }

    const handleEdit = async (taskId) =>{
        navigate(`/edit/${taskId}`)
    }   
    return(
        <div>
            <div>
                <span className='circle-bottom'></span>
            </div>

            <div className='subtitle'>
                <h1>MY TASKS</h1>
            </div>

            <div className="tasks-list">
                {tasks === null ? (
                <p>Loading...</p>
                ) : tasks.length === 0 ? (
                <p>No tasks yet.</p>
                ) : (
                tasks.map((task) => (
                    <div className="task-item" key={task.id}>
                        {/* <input
                            type="checkbox"
                            checked={task.completed || false}
                            onChange={() => handleToggleComplete(task)}
                        /> */}
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                            {task.content}
                        </span>
                        <div className="task-actions">
                            <FaEdit className="icon edit" onClick={() => handleEdit(task.id)} />
                            <FaTrashAlt className="icon delete" onClick={() => handleDelete(task.id)} />
                        </div>
                    </div>
                ))
                )}
            </div>
        </div>
    )
}
export default Tasks