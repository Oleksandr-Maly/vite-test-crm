import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { AuthForm } from './AuthForm';

const LoginPage: React.FC = () => {
  const [authing, setAuthing] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setAuthing(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setAuthing(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string | undefined,
    password: string | undefined,
  ) => {
    e.preventDefault();
    if (email && password) {
      await signUpWithEmailAndPassword(email, password);
    }
  };

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mt-4'>
      <p className='h6'>Want to create account?</p>
      <Card.Body>
        <AuthForm buttonTitle='Sign Up' handleSubmit={handleSubmit} authing={authing} />
      </Card.Body>
      <Card.Text className='d-flex justify-content-center align-items-center mt-4 mb-2'>
        <p className='mr-2 mb-0'>Already have an account?</p>
        <Link to='/auth/login' style={{ color: '#1877f2' }}>
          Sign In
        </Link>
      </Card.Text>
    </Container>
  );
};

export default LoginPage;
