import React from 'react'
import { Route, Routes } from "react-router-dom";
import pages from './pages';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<pages.LandingPage />} />
        <Route path="/home" element={<pages.HomePage />} />
        <Route path="/profile" element={<pages.ProfilePage />} />
        <Route path="/newsletter" element={<pages.NewsletterPage />} />
        <Route path="/createProduct" element={<pages.ProductCreationPage />} />
        <Route path="/profile/edit" element={<pages.EditProfilePage />} />
        <Route path="/changelog" element={<pages.ChangelogPage />} />
        <Route path='/categories/:id' element={<pages.CategoriesPage/>} />
        <Route path='/sponsor' element={<pages.SponsorPage/>}/>
        <Route path='/product/:id' element={<pages.ProductPage/>}/>
        <Route path='/admin' element={<pages.AdminPage/>}/>
        <Route path="/admin/analytics" element={<pages.AnalyticsPage/>} />
        <Route path="/discussions" element={<pages.DiscussionsPage/>} />
      </Routes>
    </>
  );
}

export default App