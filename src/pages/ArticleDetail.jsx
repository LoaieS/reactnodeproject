import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ArticleDetail.css';

function ArticleDetail({ articles }) {
  const { id } = useParams();
  const article = articles.find((a) => a.id.toString() === id);

  if (!article) {
    return <p className="article-notfound">Article not found.</p>;
  }

  return (
    <div className="article-detail-container">
      <h2 className="article-detail-title">{article.title}</h2>
      {article.image ? (
        <img 
          src={article.image} 
          alt={article.title} 
          className="article-detail-image"
        />
      ) : (
        <p className="article-detail-noimage">No image provided.</p>
      )}
      <p className="article-detail-content">{article.content}</p>
      
      <Link to="/" className="article-detail-backlink">
        Back to Home
      </Link>
    </div>
  );
}

export default ArticleDetail;
