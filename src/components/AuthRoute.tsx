/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<Props> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authCheck();
    return () => unsubscribe();
  }, [auth]);

  const authCheck = () => {
    return onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate('/auth/login');
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthRoute;
