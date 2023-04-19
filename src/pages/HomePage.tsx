import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { doc, Firestore, getDoc } from 'firebase/firestore';

type User = {
  createdAt: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
};

type Props = {
  db: Firestore;
};

const HomePage: React.FC<Props> = ({ db }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    console.log(`start getting user from firestore`);
    getUserFromFirestore();
  }, [user]);

  const getUserFromFirestore = async () => {
    setLoading(true);
    try {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setCurrentUser(docSnap.data() as User);
        console.log('current user:', currentUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signOutHandler = async () => {
    console.log('sign out clicked');
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Home Page</p>
      <button onClick={signOutHandler}> Sign Out</button>
      {loading && <p>Loading...</p>}
      {currentUser && (
        <>
          <p>{currentUser.role}</p>
          <p>{currentUser.email}</p>
        </>
      )}
    </div>
  );
};

export default HomePage;
