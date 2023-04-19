import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Firestore } from 'firebase/firestore';
import { addUserToDatabase } from '~/utils/addUserToDatabase';
import { getUserFromDatabase } from '~/utils/getUserFromDatabase';
import { useDispatch } from 'react-redux';

type Props = {
  children: React.ReactNode;
  db: Firestore;
};

const AuthRoute: React.FC<Props> = ({ children, db }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const authCheck = () => {
    return onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (!user) {
          navigate('/auth/login');
        } else {
          await addUserToDatabase(user, db);
          await getUserFromDatabase(user, db, dispatch);
        }
      } catch (error) {
        console.error('Error getting user from Firestore:', error);
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = authCheck();
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthRoute;
