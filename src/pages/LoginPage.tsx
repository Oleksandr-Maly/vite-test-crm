import React, { useEffect, useState } from 'react';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
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
    <div>
      <p>Login Page</p>
      <button onClick={signInWithGoogle} disabled={authing}>
        Sign In With Google
      </button>
      <button onClick={signInWithFacebook} disabled={authing}>
        Sign In With Facebook
      </button>
    </div>
  );
};

export default LoginPage;
