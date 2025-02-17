import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import '../styles/Home.css';

function Home({ articles }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Notification logic
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setNotification(location.state.message);
      // Clear out the message from state so it doesn't show again if user revisits
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Automatically fade out after 3 seconds...
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);


  return (
    <div className="home-container">
       {notification && (
        <div className="notification">{notification}</div>
       )}
      <h2 className="home-title">Home Page</h2>
      <p className="home-description">
        Welcome to the Sharanj Forum!<br/>Here are the latest posts
      </p>

      <div className="home-actions">
        <button 
          className="create-article-button"
          onClick={() => navigate('/new-article')}
        >
          Create New Article
        </button>
      </div>

      <div className="home-articles">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            image={article.image}
            onClick={() => navigate(`/article/${article.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
