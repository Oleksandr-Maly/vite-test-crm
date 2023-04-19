import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthForm } from './AuthForm';

const Login: React.FC = () => {
  const [authing, setAuthing] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithEmailPassword = async (email: string, password: string) => {
    try {
      setAuthing(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
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
      await signInWithEmailPassword(email, password);
    }
  };

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mt-4'>
      <h1 className='h6'>Want to log in?</h1>
      <Card.Body>
        <AuthForm buttonTitle='Log In' handleSubmit={handleSubmit} authing={authing} />
      </Card.Body>
      <Card.Text className='d-flex justify-content-center align-items-center mt-4 mb-2'>
        <div className='mr-2 mb-0'>Do not have account?</div>
        <Link to='/auth/signup' style={{ color: '#1877f2' }}>
          Register
        </Link>
      </Card.Text>
    </Container>
  );
};

export default Login;
