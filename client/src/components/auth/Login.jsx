import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <>
            <Form className='my-4'>
                <Form.Group className="mt-4 mb-4">
                    <Form.Control type="text" placeholder="Username" name="username" required />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control type="password" placeholder="Password" name="password" required />
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
