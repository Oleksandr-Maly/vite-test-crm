import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import {
  Firestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
  db: Firestore;
};

const AuthRoute: React.FC<Props> = (props) => {
  const { children, db } = props;
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const createFirestoreUser = async (user: User): Promise<void> => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        console.log('User with this email already exists.');
        return;
      }
      try {
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          role: 'user',
        });
        console.log('User added to Firestore collection');
      } catch (error) {
        console.error('Error adding user to Firestore collection:', error);
      }
    } else {
      // user exists in Firestore
      console.log('user exists in Firestore document!');
    }
  };

  useEffect(() => {
    const unsubscribe = authCheck();
    return () => unsubscribe();
  }, [auth]);

  const authCheck = () => {
    return onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate('/auth/login');
      } else {
        createFirestoreUser(user);
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthRoute;
