import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../API/api';
import '../styles/CreateArticle.css';

function CreateArticle({user}) {
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Build the new article object with additional fields
        const newArticle = {
            image: imageFile,
            title,
            type,
            description,
            content
        };

        if (user) {
            try {
                newArticle.author = user.username;
                // Make a POST request to the backend to create the article
                await axios.post('/api/articles', newArticle, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Navigate back to home with a success message
                navigate('/', { state: { message: 'Article successfully added!' } });
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Error creating article');
            }
        }
        else {
            navigate('/auth');
        }
    };

    return (
        <div className="create-article-container">
        <h2 className="create-article-title">Create New Article</h2>
        {error && <p className="error-message">{error}</p>}
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
            <label>Image (Optional)</label>
            <input 
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setImageFile(e.target.files[0]);
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
