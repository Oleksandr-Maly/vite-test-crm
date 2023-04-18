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

  const [loading, setLoading] = useState(false);

  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/login');
    }
  });

  useEffect(() => {
    authCheck();
    return () => authCheck();
  }, [auth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthRoute;
