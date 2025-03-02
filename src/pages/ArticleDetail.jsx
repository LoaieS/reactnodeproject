import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../API/api';
import '../styles/ArticleDetail.css';

function ArticleDetail({ user }) {
    const navigate = useNavigate();
    if (!user) navigate('/auth');
    const [article, setArticle] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
        try {
            if (user) {
                const articleResponse = await axios.get(`/api/articles/${id}`);
                setArticle(articleResponse.data[0]);
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

    if (!article) {
        return <p className="article-notfound">Article not found.</p>;
    }

    const canDelete = user && (user.role === 'admin' || user.username === article.author);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
        if (user && canDelete) {
            try {
                await axios.delete(`/api/articles/${id}`);
                navigate('/');
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        } else {
            navigate('/');
        }
        }
    };

    const imagePath = `http://localhost:3000${article.image_path}`;

    return (
        <div className="article-detail-container">
        <h2 className="article-detail-title">{article.title}</h2>

        {article.image_path ? (
            <img
            src={imagePath}
            alt={article.title}
            className="article-detail-image"
            />
        ) : (
            <p className="article-detail-noimage">No image provided.</p>
        )}

        <div className="article-metadata-row">
            <span className="metadata-item">
            <strong>Type:</strong> {article.type}
            </span>
            <span className="metadata-item">
            <strong>Posted:</strong> {new Date(article.created_at).toLocaleDateString()}
            </span>
            {article.updated_at && (
            <span className="metadata-item">
                <strong>Updated:</strong> {new Date(article.updated_at).toLocaleDateString()}
            </span>
            )}
            <span className="metadata-item">
            <strong>Author:</strong> {article.author}
            </span>
        </div>

        <p className="article-detail-content">{article.content}</p>

        <div className="article-detail-actions">
            <Link to="/" className="article-detail-backlink">Back to Home</Link>
            {canDelete && (
            <button className="delete-article-button" onClick={handleDelete}>
                Delete Article
            </button>
            )}
        </div>
        </div>
    );
}

export default ArticleDetail;
