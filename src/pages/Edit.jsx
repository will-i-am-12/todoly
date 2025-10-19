import './Edit.css'
import { supabase } from "/client.js"
import { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Edit = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const { session } = UserAuth();
    const user = session?.user;

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch task content
    useEffect(() => {
        if (!user) return;

        const fetchTask = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("todo")
                    .select("content")
                    .eq("id", parseInt(id))
                    .eq("user_id", user.id)
                    .single();

                if (error) throw error;

                setContent(data.content);
            } catch (err) {
                console.error(err);
                setError("Failed to load task");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) return;

        try {
        const { error } = await supabase
            .from('todo')
            .update({ content })
            .eq('id', parseInt(id))
            .eq('user_id', user.id);

        if (error) throw error;
        navigate('/tasks');
        } catch (err) {
        console.error(err);
        setError('Failed to update task');
        }
    };

    if (!user) return <p>Loading user...</p>;
    if (loading) return <p>Loading task...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div className="edit-page">
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
                <div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/tasks')}>
                    Cancel
                </button>
                </div>
            </form>
        </div>
    )
}
export default Edit