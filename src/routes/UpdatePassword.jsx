import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client';

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  // const [sessionChecked, setSessionChecked] = useState(false);
  // const [validSession, setValidSession] = useState(false);
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const refreshToken = searchParams.get('refresh_token');
  const accessToken = searchParams.get('access_token');
  const type = searchParams.get('type');

  useEffect(() => {
    const init = async () => {
      if (type === 'recovery' && accessToken && refreshToken) {
        // Try to set the session from URL tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error(error);
          navigate('/');
          return;
        }

        if (data?.session) {
          setValidSession(true);
        }
      } else {
        navigate('/');
      }
    };

    init();
  }, [type, accessToken, refreshToken, navigate]);
  
  // useEffect(() => {
  //   if (sessionChecked && !validSession) {
  //     navigate('/');
  //   }
  // }, [sessionChecked, validSession, navigate]);

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
    }
    const timer = setTimeout(() => {
        navigate('/')
      }, 3000);
  
  };

  if (!validSession) return null;

  // if (!sessionChecked) return <p>Verifying reset session...</p>;

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