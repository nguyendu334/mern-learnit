import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../contexts/AuthContext';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';

export default function NavbarMenu() {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img src={learnItLogo} alt="learnit logo" width="32" height="32" className="mr-2" />
                Learn IT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to="/dashboard" as={Link} className="font-weight-bolder text-white">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link to="/about" as={Link} className="font-weight-bolder text-white">
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link disabled className="font-weight-bolder text-white mt-1">
                        Welcome, {username}
                    </Nav.Link>
                    <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout}>
                        <img src={logoutIcon} alt="logout" width="32" height="32" className="mr-2" />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
