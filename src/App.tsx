import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getFirestore } from 'firebase/firestore';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

import AuthRoute from './components/AuthRoute';
import SignUp from './components/SignUp';
import Login from './components/Login';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App: React.FC = () => {
  return (
    <BrowserRouter basename='/vite-test-crm/'>
      <Routes>
        <Route
          path='/'
          element={
            <AuthRoute db={db}>
              <HomePage db={db}/>
            </AuthRoute>
          }
        />
        <Route path='/auth' element={<AuthPage />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
