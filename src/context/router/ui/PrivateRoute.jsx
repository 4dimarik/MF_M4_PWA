import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { PrivateRoute };
