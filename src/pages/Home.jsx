import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import axios from '../API/api'; 
import '../styles/Home.css';

function Home({user}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [notification, setNotification] = useState('');
  const [articles, setArticles] = useState([]);

  // States for sorting, filtering, and search
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setNotification(location.state.message);
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fetch articles if user session is valid
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (user) {
          const articlesResponse = await axios.get('/api/articles');
          setArticles(articlesResponse.data);
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error fetching session or articles:', error);
        navigate('/auth');
      }
    };

    fetchArticles();
  }, [navigate, user]);

  const filteredArticles = articles
    .filter(article => (filterType ? article.type === filterType : true))
    .filter(article =>
      searchTerm
        ? article.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortBy === 'updated') {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  return (
    <div className="home-container">
      {notification && <div className="notification">{notification}</div>}

      <h2 className="home-title">Home Page</h2>
      <p className="home-description">
        Welcome to the Sharanj Forum!<br />Here are the latest posts
      </p>

        {/* Action button to create new article */}
        <div className="home-actions">
        <button 
            className="create-article-button"
            onClick={() => navigate('/new-article')}
        >
        Create New Article
        </button>
        </div>

      <div className="home-controls">
        {/* Sorting section */}
        <div className="home-controls-row">
          <label className="control-label" htmlFor="sortBy">Sort By:</label>
          <select 
            id="sortBy" 
            className="sort-select" 
            onChange={(e) => setSortBy(e.target.value)} 
            value={sortBy}
          >
            <option value="updated">Last updated</option>
            <option value="created">Date created</option>
          </select>
        </div>

        {/* Filtering section */}
        <div className="home-controls-row">
        <span className="control-label">Filter:</span>
        <button 
            className={`filter-button ${filterType === 'Help' ? 'active' : ''}`} 
            title="Show only Help articles" 
            onClick={() => setFilterType('Help')}
        >
            Help
        </button>
        <button 
            className={`filter-button ${filterType === 'Strategy' ? 'active' : ''}`} 
            title="Show only Strategy articles" 
            onClick={() => setFilterType('Strategy')}
        >
            Strategy
        </button>
        <button 
            className={`filter-button ${filterType === 'Discussion' ? 'active' : ''}`} 
            title="Show only Discussion articles" 
            onClick={() => setFilterType('Discussion')}
        >
            Discussion
        </button>
        <button 
            className="filter-button clear-button" 
            title="Show all articles" 
            onClick={() => setFilterType('')}
        >
            Clear Filter
        </button>
        </div>

        {/* Search section */}
        <div className="home-controls-row search-row">
          <label className="control-label" htmlFor="searchTerm">Search:</label>
          <input
            type="text"
            id="searchTerm"
            className="search-input"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Articles */}
      <div className="home-articles">
        {filteredArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            user={user}
            onClick={() => navigate(`/article/${article.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
