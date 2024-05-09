import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
        setTimeout(() => setLoading(false), 1300); 
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center text-center">
        <div className="spinner-container">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
       
        </div>
      </div>
    );
  }

  if (!article) {
    return <div>Errore nella fetch</div>;
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center text-center">
      <div className="card">
        <h5 className="card-title">{article.title}</h5>
        <img src={article.image_url} className="card-img-top" alt={article.title} />
        <div className="card-body">
          <p className="card-text">Date Published: {article.published_at}</p>
          <p className="card-text">{article.summary}</p>
          <p className="card-text">Risorsa: {article.news_site}</p>
          <a href={article.url} target="_blank" className="btn btn-primary">Leggi l'articolo Completo</a>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;