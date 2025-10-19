import './Create.css'
import { supabase } from "/client.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserAuth } from '../context/AuthContext';

const Create = () =>{
    const navigate = useNavigate()
    const [form, setForm] = useState({context: ""})
    const {session} = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.context.trim()) return;

        if (!session || !session.user) {
            console.error('No user session found.');
            return;
        }
        const { error } = await supabase.from("todo").insert([
            { content: form.context, user_id: session.user.id }
        ]);

        if (!error)
        {
            setForm({ context: "" });
            navigate("/tasks");
        }
        else console.error(error);
    }
        

    const moveBack =()=>{
        navigate('/tasks');
    }
    return(
        
        <div>
            <span className='circle'></span>
            <div className='add-subtitle'>
                <h1>ADD NEW TASK</h1>
            </div>
            <form className = "form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add task..."
                    value={form.context}
                    onChange={(e) => setForm({ ...form, context: e.target.value })}
                />
                <div className='form-button'>
                    <button type="submit">ADD</button>
                    <button type="button" onClick={moveBack}>BACK</button>
                </div>

            </form>
        </div>
    )
}
export default Create;