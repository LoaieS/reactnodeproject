import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateArticle.css';

function CreateArticle({ onAddArticle }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = '';
    if (imageFile) {
      base64Image = await convertFileToBase64(imageFile);
    }

    // Create the new article object
    const newArticle = {
      title,
      description,
      content,
      image: base64Image
    };

    onAddArticle(newArticle);

    // Navigate back to home with a success message
    navigate('/', { state: { message: 'Article successfully added!' } });
  };

  // Simple file-to-base64 converter
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="create-article-container">
      <h2 className="create-article-title">Create New Article</h2>
      <form className="create-article-form" onSubmit={handleSubmit}>
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
          <label>Image (Optional)</label>
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
