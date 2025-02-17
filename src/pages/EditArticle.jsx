import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditArticle.css';

function EditArticle({ articles, onEditArticle }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the article to edit
  const existingArticle = articles.find(a => a.id.toString() === id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title);
      setDescription(existingArticle.description);
      setContent(existingArticle.content);
      setImage(existingArticle.image);
    }
  }, [existingArticle]);

  // If article not found, show a message
  if (!existingArticle) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Article not found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedArticle = {
      ...existingArticle,
      title,
      description,
      content,
      image
    };

    onEditArticle(updatedArticle);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="edit-article-container">
      <h2 className="edit-article-title">Edit Article</h2>
      <form className="edit-article-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <input 
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea
            rows="5"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Current Image (Base64 or URL)</label>
          <input 
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="edit-article-actions">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;
