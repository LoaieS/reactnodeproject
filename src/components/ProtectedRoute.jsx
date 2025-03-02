import { Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ user, children }) => {
    return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute