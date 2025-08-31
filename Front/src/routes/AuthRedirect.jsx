import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthRedirect = () => {
    const {usuario} = useAuth();

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};