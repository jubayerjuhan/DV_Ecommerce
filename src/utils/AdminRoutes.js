import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
} from "react-router-dom";


function PrivateRoute({ children, ...rest }) {
  const { user } = useSelector(state => state.user);


  if (user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet />

}

export default PrivateRoute;