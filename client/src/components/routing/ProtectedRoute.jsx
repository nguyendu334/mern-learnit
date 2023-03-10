import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../../contexts/AuthContext';
import NavbarMenu from './../layouts/NavbarMenu';

export default function ProtectedRoute({ component: Component, ...rest }) {
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
                        <NavbarMenu />
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
