import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client';

const UpdatePassword = () => {
  // const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [error, setError] = useState("")
  const navigate = useNavigate();

  
  // const accessToken = searchParams.get('access_token');
  // const type = searchParams.get('type');

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) {
        setValidSession(true);
      }
      setSessionChecked(true);
    });

    // Trigger immediate check just in case session is already available
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setValidSession(true);
      }
      setSessionChecked(true);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (sessionChecked && !validSession) {
      navigate('/');
    }
  }, [sessionChecked, validSession, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus({ success: false, message: error.message });
    } else {
      setStatus({ success: true, message: 'Password updated successfully!' });
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  
  };

  if (!sessionChecked) return <p>Verifying reset session...</p>;

  return (
    <div className="update-password-page">
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {status && (
        <p className={status.success ? 'success' : 'error'}>{status.message}</p>
      )}
      {
        error &&(
          <p className='error-message'>{error}</p>
        )
      }
    </div>
  );
};
export default UpdatePassword;