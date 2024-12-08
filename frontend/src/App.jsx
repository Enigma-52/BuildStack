import React from 'react'
import { Route, Routes } from "react-router-dom";
import pages from './pages';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<pages.LandingPage />} />
        <Route path="/home" element={<pages.HomePage />} />
        <Route path="/profile/:userId" element={<pages.ProfilePage />} />
        <Route path="/newsletter" element={<pages.NewsletterPage />} />
        <Route path="/createProduct" element={<pages.ProductCreationPage />} />
        <Route path="/profile/edit" element={<pages.EditProfilePage />} />
        <Route path="/changelog" element={<pages.ChangelogPage />} />
        <Route path='/categories/:id' element={<pages.CategoriesPage/>} />
        <Route path='/categories' element={<pages.AllCategoriesPage/>} />
        <Route path='/product/:id' element={<pages.ProductPage/>}/>
        <Route path='/admin' element={<pages.AdminPage/>}/>
        <Route path="/admin/analytics" element={<pages.AnalyticsPage/>} />
        <Route path='/admin/issues' element={<pages.AdminIssuesPage/>}/>
        <Route path="/admin/reports" element={<pages.AdminReportsPage/>} />
        <Route path="/admin/settings" element={<pages.AdminSettingsPage/>} />
        <Route path="/discussions" element={<pages.DiscussionsPage/>} />
        <Route path="/advertise" element={<pages.AdvertisePage />} />
        <Route path='/contactus' element={<pages.ContactUsPage/>} />
        <Route path='/notifications' element={<pages.NotificationsPage/>} />

      </Routes>
    </>
  );
}

export default App