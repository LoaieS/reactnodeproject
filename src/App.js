// Loaie Shalloufi
// Tareq Abu Yunis

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from './API/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Auth from './pages/Auth';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check user on mount
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get('/api/users/current', { withCredentials: true});
            if (response.data) {
              setUser(response.data);
            }
          } catch (error) {
            console.log('Current user fetch failed:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    const handleAuthSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        try {
            axios.post('/api/users/logout', { withCredentials: true});
        } catch (error) {
            console.log('Logout failed', error);
        }
        setUser(null);
    };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
        <Route 
          path="/" 
          element={
              <Home user={user}/>
          } 
        />
        <Route 
          path="/about" 
          element={
              <About user={user}/>
          } 
        />
        <Route 
          path="/contact" 
          element={
              <Contact user={user}/>
          } 
        />
        <Route 
          path="/article/:id" 
          element={
              <ArticleDetail user={user}/>
          } 
        />
        <Route 
          path="/new-article" 
          element={
              <CreateArticle user={user} />
          } 
        />
        <Route 
          path="/edit-article/:id" 
          element={
              <EditArticle user={user}/>
          } 
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
