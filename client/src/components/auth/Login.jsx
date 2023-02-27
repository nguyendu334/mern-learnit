import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);
    const { username, password } = loginForm;

    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    };

    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({ type: 'danger', message: 'Login Failed' });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <h1>Login</h1>
                <h4>Keep track of what you are learning</h4>
                <AlertMessage info={alert} />
                <Form.Group className="mt-4 mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </>
    );
}
