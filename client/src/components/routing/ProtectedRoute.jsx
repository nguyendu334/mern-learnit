import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProtectedRoute ({ component: Component, ...rest }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
}
