import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArticleCard.css';

const BASE_URL = 'http://localhost:3000';

function ArticleCard({ article, user }) {
    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate(`/article/${article.id}`);
    };
  
    const handleEditClick = (e) => {
      e.stopPropagation(); // Prevent card click from firing
      navigate(`/edit-article/${article.id}`);
    };
    
    // Build the full path for the image:
    const imagePath = article.image_path
    ? `${BASE_URL}${article.image_path}`
    : null;

    const canEdit = user && (user.username === article.author || user.role === 'admin');

    return (
        <div className="article-card" onClick={handleCardClick}>
        {/* Edit icon in top-right */}
        {canEdit && (
        <div className="edit-icon" onClick={handleEditClick}>
          &#9998; {/* Unicode pencil icon */}
        </div>
        )}
  
        {article.image_path ? (
          <img 
            src={imagePath} 
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
