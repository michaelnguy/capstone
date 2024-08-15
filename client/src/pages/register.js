import React, { useContext, useState } from 'react';

import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const uploadFields = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log('invalid email');
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ password: "Passwords don't match" });
      return;
    }
    fetch(`${ENDPOINT}/signup`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('error with signup');
        } else {
          console.log('signup successful');
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row className='mt-5 justify-content-center align-items-center'>
        <div className='auth-wrapper'>
          <h1 className='text-center'>Register</h1>
          <Form>
            <Form.Group>
              <Form.Label className={errors.name && 'text-danger'}>
                {errors.name ?? 'Name'}
              </Form.Label>
              <Form.Control
                placeholder='Registering is disabled for this demo'
                name='name'
                type='text'
                value={name}
                className={errors.name && 'is-invalid'}
                onChange={(e) => setName(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email'}
              </Form.Label>
              <Form.Control
                placeholder='Registering is disabled for this demo'
                name='email'
                type='text'
                value={email}
                className={errors.email && 'is-invalid'}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Password'}
              </Form.Label>
              <Form.Control
                placeholder='Registering is disabled for this demo'
                name='password'
                type='password'
                value={password}
                className={errors.password && 'is-invalid'}
                onChange={(e) => setPassword(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Confirm Password'}
              </Form.Label>
              <Form.Control
                placeholder='Registering is disabled for this demo'
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                className={errors.password && 'is-invalid'}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled
              />
            </Form.Group>

            <div className='text-center mt-4'>
              <Button variant='success' type='submit' disabled>
                Register
              </Button>
              <br />
              <small>
                Already have an account? <Link to='/login'>Login</Link>
              </small>
            </div>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className='mt-5'>
              <ul className='list'>
                {Object.values(errors).map((value) => (
                  <li style={{ color: 'red' }} key={value}>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Row>
    </Container>
  );
}
