// Loaie Shalloufi
// Tareq Abu Yunis

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';

/**
 * App Component
 *
 * Sets up routing, shares the articles data, 
 * and includes the Navbar on every page.
 */
function App() {
    const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Roguelike Chess Tactics',
      description: 'An overview of the top tactics to use in Sharanj.',
      content: `In-depth explanation of how to combine chess strategies with roguelike elements to outmaneuver your foes in Sharanj. Detailed examples follow...`,
      image: 'https://chessmood.sfo3.cdn.digitaloceanspaces.com/chessmood/images/articles/826/1690107709_64bcff3d98c9a.webp'
    },
    {
      id: 2,
      title: 'Beginner’s Guide to Sharanj',
      description: 'All you need to know to start playing Sharanj today.',
      content: `From basic movement to special abilities, learn everything you need to begin your journey in the Sharanj universe. Here’s what you should know...`,
      image: 'https://www.superguide.com.au/wp-content/uploads/Guide-for-beginners_2434918_c.jpg'
    },
    {
      id: 3,
      title: 'Advanced Builds and Decks',
      description: 'How to customize your hero and deck for advanced play.',
      content: `For experienced players seeking an extra challenge, we explore advanced hero builds and deck synergies to conquer the toughest dungeons...`,
      image: 'https://minireview.io/common/uploads/cache/review/1-900-506-219ba0cf99911662027337044c60dcdf.webp'
    }
  ]);

  // Function to add a new article
  const handleAddArticle = (newArticle) => {
    // Generate a unique ID
    const nextId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    setArticles((prev) => [...prev, { ...newArticle, id: nextId }]);
  };

  // Function to edit an existing article
  const handleEditArticle = (updatedArticle) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home articles={articles} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
            <Route path="/new-article" element={<CreateArticle onAddArticle={handleAddArticle} />} />
            <Route path="/edit-article/:id" element={<EditArticle articles={articles} onEditArticle={handleEditArticle}/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
