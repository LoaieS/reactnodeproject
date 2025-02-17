import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArticleCard.css';

function ArticleCard({ article }) {
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/article/${article.id}`);
    };
  
    const handleEditClick = (e) => {
      e.stopPropagation(); // Prevent card click from firing
      navigate(`/edit-article/${article.id}`);
    };
  
    return (
      <div className="article-card" onClick={handleCardClick}>
        {/* Edit icon in top-right */}
        <div className="edit-icon" onClick={handleEditClick}>
          &#9998; {/* Unicode pencil icon */}
        </div>
  
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-card-image" 
          />
        ) : (
          <p className="article-card-noimage">No image provided</p>
        )}
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-description">{article.description}</p>
      </div>
    );
  }
  
  export default ArticleCard;
