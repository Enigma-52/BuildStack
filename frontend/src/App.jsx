import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LandingPage from './pages/LandingPage'
import NewsletterPage from './pages/NewsletterPage';
import ProductCreationPage from './pages/ProductCreationPage';
import Navbar from './components/navbar/Navbar';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="createProduct" element={<ProductCreationPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </>
  );
}

export default App