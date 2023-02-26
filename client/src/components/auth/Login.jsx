import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const { username, password } = loginForm;

    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    };

    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) navigate('/dashboard');
            else alert(loginData.message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form className="my-4" onSubmit={login}>
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
