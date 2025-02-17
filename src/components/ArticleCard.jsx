import React from 'react';
import '../styles/ArticleCard.css';

function ArticleCard({ title, description, image, onClick }) {
  return (
    <div className="article-card" onClick={onClick}>
      {image ? (
        <img src={image} alt={title} className="article-card-image" />
      ) : (
        <p className="article-card-noimage">No image provided</p>
      )}
      <h3 className="article-card-title">{title}</h3>
      <p className="article-card-description">{description}</p>
    </div>
  );
}

export default ArticleCard;
