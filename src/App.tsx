import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

import AuthRoute from './components/AuthRoute';
import SignUp from './components/SignUp';
import Login from './components/Login';

initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <BrowserRouter basename='/vite-test-crm/'>
      <Routes>
        <Route
          path='/'
          element={
            <AuthRoute>
              <HomePage />
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
