import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles');
        if (!response.ok) {
          throw new Error('Errore caricamento Fetch');
        }
        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error('I dati ricevuti non contengono gli articoli');
        }
        setArticles(data.results);
        
        setTimeout(() => setLoading(false), 1200);
      } catch (error) {
        console.error('Errore caricamento Fetch', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="my-4">Voli Spaziali...</h1>
        <div className="row">
          {loading ? (
            <div>
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
          ) : (
            articles.map(article => (
              <div key={article.id} className="col-md-4 mb-4">
                <div className="card">
                  <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt={article.title} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.summary}</p>
                    <p className="card-text"><small className="text-muted">Published at: {new Date(article.published_at).toLocaleDateString()}</small></p>
                    <p className="card-text">Risorsa: {article.news_site}</p>
                    <a href={article.url} target="_blank" className="btn btn-primary">Leggi l'articolo Completo</a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;