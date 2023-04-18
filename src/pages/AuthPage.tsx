import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import SignInWithSocialMedia from '~/components/SignInWithSocialMedia';

const LoginPage: React.FC = () => {
  return (
    <Container
      style={{
        minHeight: '100vh',
        padding: '0',
        width: '50%',
        margin: 'auto',
      }}
      className='d-flex align-items-center justify-content-center'
    >
      <Card
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        }}
      >
        <Card.Img
          src='../public/images/welcome-img.png'
          className='w-50 img-fluid'
          style={{ objectFit: 'cover', objectPosition: 'right' }}
        />
        <Card.Body className='d-flex flex-column align-items-center text-align-center justify-content-center'>
          <Card.Title>Hello!</Card.Title>
          <Outlet />
          <hr />
          <Container className='d-flex flex-column align-items-center text-align-center justify-content-center'>
            <Card.Text>or sign in with</Card.Text>
            <SignInWithSocialMedia />
          </Container>
        </Card.Body>
      </Card>
    </Container>

  );
};

export default LoginPage;
