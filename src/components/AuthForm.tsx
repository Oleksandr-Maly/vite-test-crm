import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
  authing: boolean;
  buttonTitle: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    email: string | undefined,
    password: string | undefined,
  ) => Promise<void>;
};

export const AuthForm: React.FC<Props> = ({ authing, buttonTitle, handleSubmit }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Form onSubmit={(e) => handleSubmit(e, emailRef.current?.value, passwordRef.current?.value)}>
      <Form.Group id='email'>
        <Form.Label className='mb-0'>Email</Form.Label>
        <Form.Control placeholder='Enter email' type='email' ref={emailRef} required />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Label className='mb-0'>Password</Form.Label>
        <Form.Control placeholder='Password' type='password' ref={passwordRef} required />
      </Form.Group>

      <Button variant='light' className='w-100 mt-2' type='submit' disabled={authing}>
        {buttonTitle}
      </Button>
    </Form>
  );
};
