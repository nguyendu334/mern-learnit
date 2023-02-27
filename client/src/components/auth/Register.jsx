import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

export default function Register() {
    const history = useHistory();
    const { registerUser } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);
    const { username, password } = registerForm;

    const onChangeRegisterForm = (event) => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
    };

    const register = async (event) => {
        event.preventDefault();

        try {
            const registerData = await registerUser(registerForm);
            if (registerData.success) {
                history.push('/login');
            } else {
                setAlert({ type: 'danger', message: 'Register Failed' });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <h1>Register</h1>
                <h4>Keep track of what you are learning</h4>
                <AlertMessage info={alert} />
                <Form.Group className="mt-4 mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-4">
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group> */}
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Ready have an account? <Link to="/login">Login</Link>
            </p>
        </>
    );
}
