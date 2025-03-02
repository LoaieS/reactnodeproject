import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../API/api';
import '../styles/EditArticle.css';

function EditArticle({ user }) {
    const navigate = useNavigate();

    // If user is not logged in, redirect
    if (!user) {
        navigate('/auth');
    }

    // Identify the article to edit
    const { id } = useParams();
    const [existingArticle, setExistingArticle] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    useEffect(() => {
        const fetchArticle = async () => {
        try {
            if (user) {
                const articleResponse = await axios.get(`/api/articles/${id}`);
                setExistingArticle(articleResponse.data[0]);
            } else {
            navigate('/auth');
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            navigate('/');
        }
        };
        fetchArticle();
    }, [navigate, id, user]);

    // State variables for the article fields
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (existingArticle) {
            setTitle(existingArticle.title);
            setType(existingArticle.type);
            setDescription(existingArticle.description);
            setContent(existingArticle.content);
            setImageFile(existingArticle.image_path || null);
        }
    }, [existingArticle]);

    if (!existingArticle) {
        return <p style={{ textAlign: 'center', marginTop: '20px' }}>Article not found.</p>;
    }

    // Handle the file input change
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // This will be a File object
            setImageFile(e.target.files[0]);
            setRemoveImage(false);
        }
    };

    // Handle remove image action
    const handleRemoveImage = () => {
        setImageFile(null);
        setRemoveImage(true);
    };

    // Submit the updated article
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedArticle = new FormData();
        updatedArticle.append('title', title);
        updatedArticle.append('type', type);
        updatedArticle.append('description', description);
        updatedArticle.append('content', content);
        updatedArticle.append('author', existingArticle.author); // author shouldn't be changed on update..

        // If the user selected a new file, attach it
        // If `imageFile` is a string, it means we have the old path; if it's a File, it's a new upload
        if (imageFile && typeof imageFile !== 'string') {
            updatedArticle.append('image', imageFile);
        }

        if (removeImage) {
            updatedArticle.append('removeImage', true);
        }

        try {
            // Make a PUT request to update the article
            await axios.put(`/api/articles/${id}`, updatedArticle, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Navigate back to home with a success message
            navigate('/', { state: { message: 'Article successfully updated!' } });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Error updating article');
        }
    };

    return (
        <div className="edit-article-container">
        <h2 className="edit-article-title">Edit Article</h2>
        {error && <p className="error-message">{error}</p>}

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
            <label>Type</label>
            <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Select Type</option>
                <option value="Help">Help</option>
                <option value="Strategy">Strategy</option>
                <option value="Discussion">Discussion</option>
            </select>
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
          <label>Current Image</label>
          {imageFile && typeof imageFile === 'string' && !removeImage ? (
            <img 
              src={`http://localhost:3000${imageFile}`} 
              alt="Current" 
              className="edit-image-preview" 
            />
          ) : (
            <p>No image</p>
          )}

        <div className="image-actions">
            <label>Change Image (Optional)</label>
            <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            />
            {imageFile && typeof imageFile === 'string' && !removeImage && (
            <button type="button" onClick={handleRemoveImage}>
                Remove Image
            </button>
            )}
        </div>
        </div>

        <div className="edit-article-actions">
        <button 
            type="button" 
            className="cancel-button" 
            onClick={() => navigate('/')}
        >
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
