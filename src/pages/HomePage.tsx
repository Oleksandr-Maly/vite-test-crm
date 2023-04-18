import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const HomePage: React.FC = () => {
  const auth = getAuth();
  return (
    <div>
      <p>Home Page</p>
      <button onClick={() => signOut(auth)}> Sign Out</button>
    </div>
  );
};

export default HomePage;
