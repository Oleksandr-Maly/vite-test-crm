import React, { useEffect, useState } from 'react';
import { getAuth, signOut, User } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '~/types/UserData';
import { removeUser } from '~/store/slices/userSlice';

const HomePage: React.FC = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const currentUser: UserData = useSelector((state: any) => state.user);
  const signOutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Home Page</p>
      <button onClick={signOutHandler}> Sign Out</button>
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
