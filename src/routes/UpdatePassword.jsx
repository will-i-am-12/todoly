import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client';

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');
  const type = searchParams.get('type');

  useEffect(() => {
    const validateRecovery = async () => {
      if (accessToken && type === 'recovery') {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session && !error) {
          setValidSession(true); // ✅ Verified
        } else {
          console.error('Session error:', error);
        }
      }

      setSessionChecked(true); // ✅ We're done checking, either way
    };

    validateRecovery();
  }, [accessToken, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus({ success: false, message: error.message });
    } else {
      setStatus({ success: true, message: 'Password updated successfully!' });
    }
  };

  // ⛔ If session check is done and user is not valid, redirect them
  useEffect(() => {
    if (sessionChecked && !validSession) {
      navigate('/'); // or show a 403 message
    }
  }, [sessionChecked, validSession, navigate]);

  if (!sessionChecked) {
    return <p>Verifying reset link...</p>;
  }

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
        />
        <button type="submit">Update Password</button>
      </form>
      {status && <p className={status.success ? 'success' : 'error'}>{status.message}</p>}
    </div>
  );
};

export default UpdatePassword;