import React, { useContext, useState } from 'react';

import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as Loader } from '../assets/loader.svg';

import { AuthContext } from '../context/auth';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Login(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const uploadFields = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${ENDPOINT}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('error with login');
          console.log(data.error);
          setErrors({ error: data.error });
          setLoading(false);
        } else {
          setLoading(false);
          console.log('login successful');
          context.login(data);
          navigate('/app/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row className='mt-5 justify-content-center align-items-center'>
        <div className='auth-wrapper'>
          <h1 className='text-center'>Login</h1>
          <Form onSubmit={uploadFields}>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email'}
              </Form.Label>
              <Form.Control
                name='email'
                type='text'
                value={email}
                className={errors.email && 'is-invalid'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Password'}
              </Form.Label>
              <Form.Control
                name='password'
                type='password'
                value={password}
                className={errors.password && 'is-invalid'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className='text-center mt-4'>
              <Button
                style={{ width: '80px' }}
                variant='success'
                type='submit'
                disabled={loading}
              >
                {!loading ? 'Submit' : <Loader className='spinner' />}
              </Button>
              {loading && (
                <div className='mt-1'>Sign in may take up to a minute</div>
              )}
              <br />
              <small>
                Don't have an account? <Link to='/register'>Register</Link>
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
