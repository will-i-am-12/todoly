import { Navigate,Outlet} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { session,loading } = UserAuth();

  if (loading || session === undefined) {
    return <p>Loading...</p>; 
  }


  console.log(session,loading);
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;