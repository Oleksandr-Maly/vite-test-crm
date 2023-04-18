import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import AuthRoute from './components/AuthRoute';

initializeApp(firebaseConfig);

const App: React.FC = () => {

  return (
    <BrowserRouter basename='/vite-test-crm'>
      <Routes>
        <Route
          path='/'
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
