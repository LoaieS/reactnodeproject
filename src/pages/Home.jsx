import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import '../styles/Home.css';

function Home({ articles }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2 className="home-title">Home Page</h2>
      <p className="home-description">
        Welcome to the Sharanj Forum!<br/>Here are the latest posts
      </p>


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
