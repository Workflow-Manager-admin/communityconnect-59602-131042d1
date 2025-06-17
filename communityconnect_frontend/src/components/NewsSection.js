import React, { useEffect, useState } from 'react';
import './NewsSection.css';

// PUBLIC_INTERFACE
/**
 * NEWS API Section.
 * Fetches top headlines using newsapi.org and displays them.
 */
function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Using NewsAPI.org with provided API key (always update via integration details!)
  const NEWS_API_KEY = '7eb021fdd0745282f9816f080ee0ab4d';

  // Helper to construct news API URL on every request (API key embedded)
  const getNewsApiUrl = () =>
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${NEWS_API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Always evaluate URL at fetch time to avoid stale/changed keys.
        const res = await fetch(getNewsApiUrl());
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (e) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    // Optionally refresh news every 30 minutes (to also refetch with potentially new API key)
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-section card">
      <h2>
        <span role="img" aria-label="news">📰</span> Latest News
      </h2>
      {loading ? (
        <div>Loading news...</div>
      ) : articles.length === 0 ? (
        <div>No news available.</div>
      ) : (
        <ul className="news-list">
          {articles.map((article, idx) => (
            <li key={idx} className="news-item">
              {article.urlToImage && (
                <img src={article.urlToImage} alt="" className="news-thumb" loading="lazy" />
              )}
              <div className="news-content">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-title">{article.title}</a>
                <div className="news-meta">
                  <span>{article.source?.name || "Unknown source"}</span>
                  {article.publishedAt && <span className="news-date">{(new Date(article.publishedAt)).toLocaleString()}</span>}
                </div>
                <div className="news-desc">{article.description}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsSection;
