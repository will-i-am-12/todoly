import { Navigate,Outlet} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { session,loading } = UserAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;