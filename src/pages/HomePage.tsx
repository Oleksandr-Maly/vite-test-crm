import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const HomePage: React.FC = () => {
  const auth = getAuth();

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
    </div>
  );
};

export default HomePage;
