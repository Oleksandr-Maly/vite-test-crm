import React, { useState } from 'react';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const SignInWithSocialMedia: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setAuthing(true);
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setAuthing(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setAuthing(true);
      const provider = new FacebookAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log(response.user.uid);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <Button
        className='btn btn-circle m-1'
        style={{ backgroundColor: '#DB4437', color: 'white', borderColor: '#DB4437'}}
        onClick={signInWithGoogle}
        disabled={authing}
      >
        <i className='bi bi-google' />
      </Button>
      <Button
        className='btn btn-circle m-1'
        style={{ backgroundColor: '#3b5998', color: 'white' }}
        onClick={signInWithFacebook}
        disabled={authing}
      >
        <i className='fa-brands fa-facebook-f'></i>
      </Button>
    </div>
  );
};

export default SignInWithSocialMedia;
