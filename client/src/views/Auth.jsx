import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { AuthContext } from '../contexts/AuthContext';

export default function Auth({ authRoute }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    let body;
    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) return <Redirect to="/dashboard" />;
    else {
        body = (
            <>
                {authRoute === 'login' && <Login />}
                {authRoute === 'register' && <Register />}
            </>
        );
    }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">{body}</div>
            </div>
        </div>
    );
}
